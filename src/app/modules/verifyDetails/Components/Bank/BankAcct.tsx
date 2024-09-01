"use client";

import { useState } from "react";
import styles from './bank.module.css'
import { useDispatch } from 'react-redux';
import { setVerificationStatus } from "@/app/Redux/userSlice";
import { verifyBankAPI, verifyDetailsAPI } from "@/app/Services/allAPI";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import Swal from 'sweetalert2'



function BankAccount() {
    const [accno, setAccno] = useState("")
    const [ifsc, setIfsc] = useState("")
    const [status,setStatus] = useState(false);
    const dispatch = useDispatch();
    const isVerified = useSelector((state: RootState) => state.user.isVerified.bank);

    //API Call to verify bank account
    const verifyBankAccount = async() => {
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
        const reqBody = {
                bank_account_no: accno,
                bank_ifsc_code: ifsc
        }
        try{
            const response = await verifyBankAPI(reqBody,reqHeader);
            if (response.status === 200) {
                //send the request id with get request to get account details
                const details = await verifyDetailsAPI(response.data.request_id,reqHeader)
                const account = details.data[0];
                const data = account.result

                if(data.account_exists=="YES"){
                    Swal.fire({
                        title: 'Success',
                        text: 'Account Details Verified',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      })
                    setStatus(true);
                    dispatch(setVerificationStatus({ bank: true }));
                }
                else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Invalid Account Details.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                      })
                    setStatus(true);
                }
            } 
        }
        catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'An error has occured',
                icon: 'error',
                confirmButtonText: 'OK'
              })
        }
    };

    return (
        <div className={styles.bankFields}>
            <label>Enter your Bank Account Details</label>
            <div className={styles.inputFields}>
                <div className={styles.fields}>
                    <label className="bankFields">Account Number</label>
                    <input type="text" value={accno} placeholder="Enter Account Number" onChange={(e) => setAccno(e.target.value)} />
                </div>
                <div className={styles.fields}>
                    <label className="bankFields">IFSC Code</label>
                    <input type="text" value={ifsc} placeholder="Enter IFSC Code" onChange={(e) => setIfsc(e.target.value)} />
                </div>
                <div className={styles.Button}>
                <button onClick={() => verifyBankAccount()}>Verify Account</button>

                </div>
            </div>
            <div className={styles.status}>
                {isVerified  && <div className={styles.verifiedMessage}>Verified &#10003;</div>}
            </div>

        </div>
    );
}

export default BankAccount;