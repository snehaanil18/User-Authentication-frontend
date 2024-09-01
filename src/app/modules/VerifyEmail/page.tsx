"use client";

import { useEffect, useState } from "react";
import { verifyEmailAPI, verifyOtpAPI } from '../../Services/allAPI'
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useRouter } from 'next/navigation';
import styles from '../verification.module.css';
import Swal from 'sweetalert2'

function Page() {
    const [otp, setOtp] = useState('')
    const router = useRouter()
    const email = useSelector((state: RootState) => state.user.email);

    //API Call to send OTP
    const verifyEmail = async () => {
        const reqBody = { email }
        try {
            const response = await verifyEmailAPI(reqBody);
        }
        catch (error) {
            Swal.fire({
                title: 'Error',
                text:  'Error occured in sending OTP' ,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    useEffect(() => {
        if (email) {
            verifyEmail()
        }
    }, [])

    //verify the OTP entered by user
    const verifyOtp = async () => {
        const reqBody = { email, otp };
        try {
            const response  = await verifyOtpAPI(reqBody);            
            if (response.status === 200) {
                // OTP verified successfully
                Swal.fire({
                    title: 'Success',
                    text: 'OTP verified successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
                router.push('/modules/verifyAadhar');
            }
         else {
            Swal.fire({
                title: 'Error',
                text: 'Invalid OTP or email.',
                icon: 'error',
                confirmButtonText: 'OK'
              })
            }   
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while verifying OTP. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
              })
        }
    };
    


    return (
        <div>
            <div className={styles.container}>
                <h1>Email Verification</h1>
                <p>
                    A verification code has been sent to your email: <strong>{email}</strong>
                </p>

                <div className={styles.verification}>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <button onClick={() => verifyOtp()}> Verify Email </button>
                </div>

                <div className={styles.resend}>
                    <p>Didn&apos;t get OTP?</p>
                    <button onClick={() => verifyEmail()}> Resend OTP </button>
                </div>

            </div>
        </div>
    )
}

export default Page