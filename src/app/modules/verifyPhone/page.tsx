"use client";

import { useEffect, useState } from "react";
import { verifyMobileAPI, verifyMobileOtpAPI } from '../../Services/allAPI'
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import styles from '../verification.module.css'
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'

function Page() {
    const [otp, setOtp] = useState('')

    const phone = useSelector((state: RootState) => state.user.phone);
    const router = useRouter()

    //API Call to send OTP
    const verifyMobile = async () => {
        const reqBody = {phone }
        try {
            const response = await verifyMobileAPI(reqBody);

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
        if (phone) {
            verifyMobile();
        }
    }, []);

    //verify the OTP entered by user
    const verifyOtp = async() => {
        const reqBody = {phone,otp}
        console.log(otp,phone);
        
        try {
            const response = await verifyMobileOtpAPI(reqBody);
            console.log(response);
            
            // Handle response status
            if (response.status === 200) {
                // OTP verified successfully
                Swal.fire({
                    title: 'Success',
                    text: 'OTP verified successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })

                router.push('/modules/VerifyEmail')
            } else if (response.status === 400) {
                // Bad request (e.g., OTP invalid or expired)
                Swal.fire({
                    title: 'Error',
                    text: response.data.message || 'Invalid OTP or phone number.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  })

            } else {
                // Other status codes
                Swal.fire({
                    title: 'Error',
                    text: 'Unexpected response from the server.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  })

            }
        } catch (error) {

            Swal.fire({
                title: 'Error',
                text: 'An error occurred while verifying OTP.',
                icon: 'error',
                confirmButtonText: 'OK'
              })

        }
    }        

    return (
        <div>
            <div className={styles.container}>
                <h1>Phone Number Verification</h1>
                <p>
                    A verification code has been sent to your phone: <strong>{phone}</strong>
                </p>

                <div className={styles.verification}>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <button onClick={() => verifyOtp()}> Verify Phone </button>

                </div>

                <div className={styles.resend}>
                    <p>Didn&apos;t get OTP?</p>
                    <button onClick={() => verifyMobile()}> Resend OTP </button>
                </div>
                
            </div>
        </div>
    )
}

export default Page