import { faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate=useNavigate();
    const [passwordVisisble,setPasswordVisisble]=useState(false);
    const [userName,setUserName]=useState();
    const [password,setPassword]=useState();
    const updateUserName=(e)=>{
        setUserName(e.target.value);
    }
    const updatePassword=(e)=>{
        setPassword(e.target.value);
    }
    const validateLogin=async()=>{
        const userData={
            userName,
            password,
        }
        const url=`${import.meta.env.VITE_API_URL}/auth/login`
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
            const data=await response.json();
            localStorage.clear()
            localStorage.setItem("Token",data.token)
            localStorage.setItem("User ID",data.user_id)
            localStorage.setItem("User Name",data.user_name)
            alert("Logged in Successfully")
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='w-screen h-screen absolute flex items-center justify-center bg-gray-100'>
      <div className='w-100 h-120 rounded-lg shadow-lg flex flex-col items-center justify-evenly bg-white'>
        <h1 className='text-3xl text-blue-600 font-roboto font-extrabold'>Login</h1>
        <div className='w-80 h-15 rounded-lg shadow-lg p-5 flex flex-row items-center justify-between gap-2 font-monts'>
            <p><FontAwesomeIcon icon={faUser}/></p>
            <input value={userName} onChange={updateUserName}  type="text" placeholder='Enter Username' className="w-full h-10 bg-transparent rounded-lg focus:ring-0 outline-none"/>
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
        <button onClick={validateLogin} className='w-80 h-15 rounded-lg shadow-lg bg-blue-600 text-white cursor-pointer font-monts'>Login</button>
        <h1>_____________OR_______________</h1>
        <p className='font-monts'>Don't Have an Account? <Link to="/auth/register" className='text-blue-600'>Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login
