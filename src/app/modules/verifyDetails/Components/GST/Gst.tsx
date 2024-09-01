"use client";

import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setVerificationStatus } from "@/app/Redux/userSlice";
import styles from './gst.module.css'
import { verifyGstAPI } from "@/app/Services/allAPI";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import Swal from 'sweetalert2'

function Gst(){
    const [gstNo,setGstNo] = useState("")
    const [status,setStatus] = useState(false);
    const dispatch = useDispatch();
    const isVerified = useSelector((state: RootState) => state.user.isVerified.gst);

    //API call to verify GST number
    const verifyGst = async() => {
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
        const reqBody = {
            gstin:gstNo
        }
        try{
            const response = await verifyGstAPI(reqBody,reqHeader);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'GST Number verified successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
                setStatus(true);
                dispatch(setVerificationStatus({ gst: true }));
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Invalid GST Number.',
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
    };

    return(
        <div className={styles.inputFields}>
            <label htmlFor="">GST Number:</label>
            <div className={styles.fields}>
                <input type="text" value={gstNo} onChange={(e) => setGstNo(e.target.value)} placeholder="Enter GST Number"/>
                <button onClick={() => verifyGst()}>Verify GST</button>
            </div>

            <div className={styles.status}>
                {isVerified  && <div className={styles.verifiedMessage}>Verified &#10003;</div>}
            </div>
        </div>
    )
}

export default Gst;