"use client";

import { useState } from "react";
import styles from './pan.module.css'
import { useDispatch } from 'react-redux';
import { setVerificationStatus } from "@/app/Redux/userSlice";
import { verifyPanAPI } from "@/app/Services/allAPI";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import Swal from 'sweetalert2'

function PanCardInput() {
    const [panCard, setPanCard] = useState("");
    const [status,setStatus] = useState(false);
    const dispatch = useDispatch();
    const isVerified = useSelector((state: RootState) => state.user.isVerified.pan);

    //API call to verify PAN Card
    const verifyPanCard = async() => {
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
        const reqBody = {
            pan: panCard,
            consent: "y",
            consent_text: "I hear by declare my consent agreement for fetching my information via AITAN Labs API"
        }
        try {
                const response = await verifyPanAPI(reqBody,reqHeader);
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Pan Card verified successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      })
                    setStatus(true);
                    dispatch(setVerificationStatus({ pan: true }));

                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Invalid Pan Card.',
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
            
            <label className={styles.labelName}>PAN Card Number:</label>
            <div className={styles.fields}>
                <input
                    type="text"
                    value={panCard}
                    onChange={(e) => setPanCard(e.target.value)}
                    placeholder="Enter PAN card number"
                />
                <button onClick={() => verifyPanCard()}>Verify PAN Card</button>
            </div>

            <div className={styles.status}>
                {isVerified && <div className={styles.verifiedMessage}>Verified &#10003;</div>}
            </div>

        </div>
    );
}

export default PanCardInput;
