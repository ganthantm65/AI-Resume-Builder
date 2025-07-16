import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import { faFile, faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import banner from '../assets/images/banner.png'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const userName = localStorage.getItem("User Name") || "User"

  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const [count,setCount]=useState(0);

  useEffect(()=>{
    const fetchCount=async()=>{
      const url=`http://localhost:8080/api/noOfResume/${localStorage.getItem("User ID")}`
      const option={
        method:"GET",
        headers:{
          Authorization:`Bearer ${localStorage.getItem('Token')}`,
          "Content-Type":"application/json"
        }
      }
      try {
        const response=await fetch(url,option);
        const data=await response.json();
        setCount(data.Number)
      } catch (error) {
        console.log(error);
      }
    }
    fetchCount()
  })
  const createResume = async () => {
    const url = "http://localhost:8080/api/create"
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          user_id: Number(localStorage.getItem("User ID")),
          userName
        },
        date: `${day}-${month}-${year}`
      })
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
      localStorage.setItem("Resume ID", JSON.stringify(data.resume_id))
      navigate("/form")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-screen h-screen flex bg-gray-100 dark:bg-gray-900 overflow-hidden transition-colors duration-500">
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 h-full flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 bg-white dark:bg-gray-800 shadow-md z-10">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              icon={faBars}
              className="md:hidden text-2xl cursor-pointer text-gray-700 dark:text-gray-200"
              onClick={() => setSidebarOpen(true)}
            />
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 dark:text-white font-monts tracking-wide">
              <FontAwesomeIcon icon={faFile} className="mr-2 text-blue-600" />
              CraftCV
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full shadow-sm">
            <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
            <h2 className="text-white text-sm md:text-base font-semibold font-monts capitalize">{userName}</h2>
          </div>
        </div>
        <div
          className="w-[96%] min-h-[180px] md:min-h-[250px] rounded-xl shadow-lg bg-cover bg-no-repeat bg-center flex flex-col gap-2 items-start justify-center px-6 md:px-10 mx-3 my-6 md:ml-9 transition-all duration-500"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <h2 className="text-white font-monts text-2xl md:text-4xl font-extrabold drop-shadow-lg">Hello, {userName}</h2>
          <h2 className="text-white font-monts text-sm md:text-xl font-semibold drop-shadow-sm">
            Build, edit, and manage your resumes in one place
          </h2>
        </div>
        <div className="w-full flex flex-col lg:flex-row items-start justify-between px-4 md:px-6 gap-8 font-monts dark:bg-gray-900 py-10 transition-all duration-300">
          <div
            onClick={createResume}
            className="w-full sm:w-230 h-60 md:h-80 bg-gradient-to-r from-rose-500 to-blue-700 rounded-2xl shadow-lg flex flex-col items-center justify-center cursor-pointer hover:scale-[1.02] hover:shadow-3xl transition-transform duration-300"
          >
            <FontAwesomeIcon icon={faFile} className="text-5xl md:text-6xl text-white opacity-90 mb-4 drop-shadow" />
            <h1 className="text-2xl md:text-3xl text-white font-semibold drop-shadow">Create Resume</h1>
          </div>

          <div className="flex flex-col gap-5 items-center w-full sm:w-auto">
            <div className="w-full sm:w-110 h-60 md:h-80 bg-white dark:bg-gray-700 rounded-2xl shadow-md flex items-center gap-6 px-6 hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-rose-500 to-blue-700 flex items-center justify-center shadow-inner">
                <FontAwesomeIcon icon={faFile} className="text-2xl md:text-3xl text-white" />
              </div>
              <div className="flex flex-col items-start justify-center">
                <h3 className="text-xl text-gray-500 dark:text-gray-300">Total Resumes</h3>
                <p className="text-lg md:text-5xl font-bold text-blue-500 dark:text-white">{count}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
