"use client";

import { useState } from "react";
import styles from './address.module.css'
import { useDispatch } from 'react-redux';
import { setVerificationStatus } from "@/app/Redux/userSlice";
import { verifyAddressAPI } from "@/app/Services/allAPI";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import Swal from 'sweetalert2'

function Address() {
    
    const [pincode, setPincode] = useState('')
    const [status,setStatus] = useState(false);
    const dispatch = useDispatch();
    const isVerified = useSelector((state: RootState) => state.user.isVerified.address);
    
    //API call to verify Pincode
    const verifyAddress = async() => {

        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
        try{
            const result = await verifyAddressAPI(pincode,reqHeader)

            if(result.status===200){
                Swal.fire({
                    title: 'Success',
                    text: 'Pincode verified successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
                setStatus(true);
                dispatch(setVerificationStatus({ address: true }));
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: 'Invalid Pincode.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  })
                setStatus(false);
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
    }

    return (
        <div className={styles.inputFields}>
            <label className={styles.labelName}>Pincode:</label>
            <div className={styles.fields}>
                <input type="text" value={pincode} placeholder="Enter your pincode" onChange={(e) => setPincode(e.target.value)} />
                <button onClick={() => verifyAddress()}>Verify Pincode</button>
            </div>

            <div className={styles.status}>
                {isVerified  && <div className={styles.verifiedMessage}>Verified &#10003;</div>}
            </div>

        </div>
    )

}

export default Address;