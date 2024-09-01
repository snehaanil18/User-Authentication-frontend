"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store'; 
import { setUserDetails } from '../../Redux/userSlice';
import styles from './register.module.css';
import Swal from 'sweetalert2'
import {registerAPI} from '../../Services/allAPI'
import { useRouter } from 'next/navigation';
import Link from 'next/link';


function RegisterPage() {
  //to hold user input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    aadhar: "",
    password:""
  });

  //to hold errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    aadhar: "",
    password: ""
  });


  const dispatch = useDispatch();
  const router = useRouter()
  const userReduxState = useSelector((state: RootState) => state.user);

  //handle user input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value);
  };

  //validate all input fields
  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Full Name is required";
        else if (!/^[a-zA-Z\s]+$/.test(value)) error = "Full Name must contain only letters and spaces";
        break;
      case "email":
        if (!value.trim()) error = "Email Address is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Email Address is invalid";
        break;
      case "phone":
        if (!value.trim()) error = "Phone Number is required";
        else if (!/^\d{10}$/.test(value)) error = "Phone Number must be exactly 10 digits";
        break;
      case "dob":
        if (!value.trim()) error = "Date of Birth is required";
        break;
      case "aadhar":
        if (!value.trim()) error = "Aadhar Number is required";
        else if (!/^\d{12}$/.test(value)) error = "Aadhar Number must be 12 digits";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters long";
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  //register the user
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAnyFieldEmpty = Object.values(formData).some(value => value.trim() === '');
    if (isAnyFieldEmpty || Object.values(errors).some(error => error)) {
      Swal.fire({
        title: 'Error',
        text: 'Please correct the errors before submitting',
        icon: 'error',
        confirmButtonText: 'OK'
      })
     
      return;
    }
    dispatch(setUserDetails(formData));
    try {
      const result = await registerAPI(formData);
      if(result.status==200){
        Swal.fire({
          title: 'Success',
          text: 'Successfully Registered',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        router.push('/modules/verifyPhone')
      }
      else{
        Swal.fire({
          title: 'Error',
          text: result.response.data,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error during registration',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
    
  };

  return (
    <div>
      <div className={styles.container}>

        <div className={styles.inputFields}>
          <form onSubmit={handleSubmit} className={styles.formContent}>
            <label className={styles.fieldName} htmlFor="name">Full Name</label>
            <input type="text" placeholder='John Doe' name="name" value={formData.name} onChange={handleInputChange} />
            {errors.name && <div className={styles.error}>{errors.name}</div>}

            <label className={styles.fieldName} htmlFor="email">Email Address</label>
            <input type="email" name="email" placeholder='eg: john@gmail.com' value={formData.email} onChange={handleInputChange} />
            {errors.email && <div className={styles.error}>{errors.email}</div>}

            <label className={styles.fieldName} htmlFor="phone">Phone Number</label>
            <input type="tel" name="phone" placeholder='eg: 90000000000' value={formData.phone} onChange={handleInputChange} />
            {errors.phone && <div className={styles.error}>{errors.phone}</div>}

            <label className={styles.fieldName} htmlFor="dob">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
            {errors.dob && <div className={styles.error}>{errors.dob}</div>}

            <label className={styles.fieldName} htmlFor="aadhar">Aadhar No</label>
            <input type="text" name="aadhar" placeholder='eg: 100080004000' value={formData.aadhar} onChange={handleInputChange} />
            {errors.aadhar && <div className={styles.error}>{errors.aadhar}</div>}

            <label className={styles.fieldName} htmlFor="password">Password</label>
            <input type="password" name="password" placeholder='password' value={formData.password} onChange={handleInputChange} />
            {errors.password && <div className={styles.error}>{errors.password}</div>}

            <button className={styles.submitButton} type='submit'>Register</button>
            <p>Already Registered? &nbsp; <Link href={'/modules/Login'}>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
