import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const SideBar = ({sidebarOpen, setSidebarOpen}) => {
    const navigate=useNavigate();
  return (
    <div className={`w-60 h-full absolute z-20 flex flex-col items-center justify-start gap-10 pt-10 rounded-e-lg shadow-lg bg-white transtion-transform duration-300
                    ${sidebarOpen?"translate-x-0":"-translate-x-full"} md:translate-x-0 md:static md:shadow-none`}>
      <div onClick={() => setSidebarOpen(!sidebarOpen)} className='self-end px-4 md:hidden'>
        <FontAwesomeIcon icon={faClose} className='text-xl text-gray-600 cursor-pointer'/>
      </div>
      <div className='flex flex-col items-center gap-5'>
        <h2 className='text-xl cursor-pointer' onClick={()=>{
          navigate("/dashboard")
        }}>DASHBOARD</h2>
        <button className='text-xl w-40 bg-blue-600 rounded-lg text-white cursor-pointer' onClick={
            ()=>{
                localStorage.clear();
                navigate("/")
            }
            
        }>LOG OUT</button>
      </div>
    </div>
  )
}

export default SideBar
