"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { loginAPI } from '@/app/Services/allAPI';
import styles from './login.module.css'
import Swal from 'sweetalert2'

function Page() {
  //hold user input
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const router = useRouter()

  //handle user input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  //user login
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAnyFieldEmpty = Object.values(formData).some(value => value.trim() === '');
    if (isAnyFieldEmpty) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill all fields before submitting',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return;
    }
    try {
      const result = await loginAPI(formData);
      if(result.status==200){
        Swal.fire({
          title: 'Success',
          text: 'Successfully logged in',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        sessionStorage.setItem('token',result.data.token)
        router.push('/modules/verifyDetails')
      }
      else{

        Swal.fire({
          title: 'Error',
          text: result.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      console.error('Error during login:', error);
      Swal.fire({
        title: 'Error',
        text: 'An error occured',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
    
  };


  return (
    <div>
      <div className={styles.container}>
        <form action="" className={styles.formContent} onSubmit={handleSubmit}>
          <label className="fieldName" htmlFor="email">Email Address</label>
          <input type="email" name="email" placeholder='eg: john@gmail.com' value={formData.email} onChange={handleInputChange} />

          <label className="fieldName" htmlFor="password">Password</label>
          <input type="password" name="password" placeholder='password' value={formData.password} onChange={handleInputChange} />

          <button className={styles.submitButton} type='submit'>Login</button>
        </form>

      </div>
    </div>
  )
}

export default Page