import { faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import {  faLock, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [loading,setLoading]=useState(false)
    const [passwordVisisble,setPasswordVisisble]=useState(false);
    const [userName,setUserName]=useState();
    const [email,setEmail]=useState()
    const [password,setPassword]=useState();
    const updateUserName=(e)=>{
        setUserName(e.target.value);
    }
    const updatePassword=(e)=>{
        setPassword(e.target.value);
    }
    const updateEmail=(e)=>{
        setEmail(e.target.value);
    }
    const registerAccount=async()=>{
        setLoading(true)
        const userData={
            userName,
            password,
            email
        }
        const url=`${import.meta.env.VITE_API_URL}/auth/register`
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        }
        try {
            const response=await fetch(url,options);
            if(!response.ok){
                throw new Error(response.statusText)
            }
            alert("Account Created Successfully")
            
        } catch (error) {
            alert(error);
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='w-screen h-screen absolute flex items-center justify-center bg-gray-100'>
      <div className='w-100 h-130 rounded-lg shadow-lg flex flex-col items-center justify-evenly bg-white'>
        <h1 className='text-3xl text-blue-600 font-roboto font-extrabold'>Sign up </h1>
        <div className='w-80 h-15 rounded-lg shadow-lg p-5 flex flex-row items-center justify-between gap-2 font-monts'>
            <p><FontAwesomeIcon icon={faUser}/></p>
            <input value={userName} onChange={updateUserName}  type="text" placeholder='Enter Username' className="w-full h-10 bg-transparent rounded-lg focus:ring-0 outline-none"/>
        </div>
        <div className='w-80 h-15 rounded-lg shadow-lg p-5 flex flex-row items-center justify-between gap-2 font-monts'>
            <p><FontAwesomeIcon icon={faMailBulk}/></p>
            <input value={email} onChange={updateEmail}  type="email" placeholder='Enter email' className="w-full h-10 bg-transparent rounded-lg focus:ring-0 outline-none"/>
        </div>
        <div className='w-80 h-15 rounded-lg shadow-lg p-5 flex flex-row items-center justify-between gap-2 font-monts'>
            <p><FontAwesomeIcon icon={faLock}/></p>
            <input value={password} onChange={updatePassword} type={passwordVisisble?"text":"password"} placeholder='Enter Password' className="w-full h-10 bg-transparent rounded-lg focus:ring-0 outline-none"/>
            <button onClick={()=>{ 
                setPasswordVisisble(!passwordVisisble)
            }} 
            className='cursor-pointer bg-transparent'>
                <FontAwesomeIcon icon={passwordVisisble?faEyeSlash:faEye}/>
            </button>
        </div>
        <button
          onClick={registerAccount}
          disabled={loading}
          className='w-80 h-15 rounded-lg shadow-lg bg-blue-600 text-white cursor-pointer font-monts flex items-center justify-center'
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          ) : (
            "Sign Up"
          )}
        </button>        <h1>_____________OR_______________</h1>
        <p className='font-monts'>Already Have an Account? <Link to="/auth/login" className='text-blue-600'>Login</Link></p>
      </div>
    </div>
  )
}

export default SignUp
