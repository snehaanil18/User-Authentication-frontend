"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import styles from '../verification.module.css'
import { useRouter } from 'next/navigation';
import { verifyAadharAPI } from "@/app/Services/allAPI";
import Swal from 'sweetalert2'

function Page() {
    //get aadhar number from redux state
    const aadhaar = useSelector((state: RootState) => state.user.aadhar);
    const router = useRouter()

    //api call to verify the aadhar
    const verifyAadhar = async () => {
        const reqBody = { aadhaar};
        try {
            const response = await verifyAadharAPI(reqBody);
            if(response.status==200){
                Swal.fire({
                    title: 'Success',
                    text: 'Aadhar verified successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
                router.push('/modules/Login')
            }
            else{
                Swal.fire({
                    title: 'Error',
                    text: 'Invalid Aadhar.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  })
            }
        }
        catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while verifying Aadhar. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
              })
        }
    }


    return (
        <div>
            <div className={styles.container}>
                <h1>Aadhar Number Verification</h1>
                <p>
                    A verification request will be sent for your Aadhar number: <strong>{aadhaar}</strong>
                </p>

                <div className={styles.verification}>
                    <button onClick={() => verifyAadhar()} id={styles.verify}>Verify Aadhar</button>
                </div>

                <div className={styles.resend}>
                    <p>Didn&apos;t get a response?</p>
                    <button onClick={() => verifyAadhar()}>Resend Verification</button>
                </div>
            </div>
        </div>
    )
}

export default Page