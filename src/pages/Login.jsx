import { faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisisble, setPasswordVisisble] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const updateUserName = (e) => {
    setUserName(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  const validateLogin = async () => {
    setLoading(true);
    const userData = { userName, password };
    const url = `${import.meta.env.VITE_API_URL}/auth/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      localStorage.clear();
      localStorage.setItem("Token", data.token);
      localStorage.setItem("User ID", data.user_id);
      localStorage.setItem("User Name", data.user_name);
      alert("Logged in Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-screen h-screen absolute flex items-center justify-center bg-gray-100'>
      <div className='w-100 h-120 rounded-lg shadow-lg flex flex-col items-center justify-evenly bg-white p-6'>
        <h1 className='text-3xl text-blue-600 font-roboto font-extrabold'>Login</h1>

        <div className='w-80 h-15 rounded-lg shadow-lg p-5 flex flex-row items-center justify-between gap-2 font-monts bg-white'>
          <p><FontAwesomeIcon icon={faUser} /></p>
          <input
            value={userName}
            onChange={updateUserName}
            type="text"
            placeholder='Enter Username'
            disabled={loading}
            className="w-full h-10 bg-transparent rounded-lg focus:ring-0 outline-none"
          />
        </div>

        <div className='w-80 h-15 rounded-lg shadow-lg p-5 flex flex-row items-center justify-between gap-2 font-monts bg-white'>
          <p><FontAwesomeIcon icon={faLock} /></p>
          <input
            value={password}
            onChange={updatePassword}
            type={passwordVisisble ? "text" : "password"}
            placeholder='Enter Password'
            disabled={loading}
            className="w-full h-10 bg-transparent rounded-lg focus:ring-0 outline-none"
          />
          <button
            onClick={() => setPasswordVisisble(!passwordVisisble)}
            className='cursor-pointer bg-transparent'
            disabled={loading}
          >
            <FontAwesomeIcon icon={passwordVisisble ? faEyeSlash : faEye} />
          </button>
        </div>

        <button
          onClick={validateLogin}
          disabled={loading}
          className='w-80 h-15 rounded-lg shadow-lg bg-blue-600 text-white cursor-pointer font-monts flex items-center justify-center'
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          ) : (
            "Login"
          )}
        </button>

        <h1>_____________OR_______________</h1>
        <p className='font-monts'>Don't Have an Account? <Link to="/auth/register" className='text-blue-600'>Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login;
