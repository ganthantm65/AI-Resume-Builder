import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import { faFile, faUser } from '@fortawesome/free-regular-svg-icons'
import {  faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PersonalInfo from '../components/PersonalInfo'
import Education from '../components/Education'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import WorkExperience from '../components/WorkExperience'
import Certifications from '../components/Certification'

const MultiForm = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const userName = localStorage.getItem("User Name") || "User"
  const [steps, setSteps] = useState(0)

  const nextSteps = () => setSteps((prev) => prev + 1)
  const prevSteps = () => setSteps((prev) => prev - 1)

  const [formData, setFormData] = useState({
    personalInfo: {},
    educations: [],
    skills: [],
    projects: [],
    workExperiences: [],
    certifications: [],
  });

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data
    }));
  };

  const setForm = () => {
    switch (steps) {
      case 0:
        return <PersonalInfo data={formData.personalInfo} update={updateFormData} next={nextSteps} />
      case 1:
        return <Education data={formData.educations} update={updateFormData} next={nextSteps} previous={prevSteps}/>
      case 2:
        return <Skills data={formData.educations} update={updateFormData} next={nextSteps} previous={prevSteps}/>
      case 3:
        return <Projects data={formData.projects} update={updateFormData} next={nextSteps} previous={prevSteps}/>
      case 4:
        return <WorkExperience data={formData.workExperiences} update={updateFormData} next={nextSteps} previous={prevSteps}/>
      case 5:
        return <Certifications data={formData.certifications} update={updateFormData} next={nextSteps} previous={prevSteps} formData={formData}/>
      default:
        return <div>Invalid Step</div>
    }
  }

  return (
    <div className="w-screen h-screen flex bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 h-full flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              icon={faBars}
              className="md:hidden text-2xl cursor-pointer text-gray-700 dark:text-gray-200"
              onClick={() => setSidebarOpen(true)}
            />
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 dark:text-white font-monts">
              <FontAwesomeIcon icon={faFile} className="mr-2 text-blue-600" />
              CraftCV
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
            <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
            <h2 className="text-white text-sm md:text-base font-semibold font-monts">{userName}</h2>
          </div>
        </div>

        <div className="p-4 sm:p-6 w-full sm:w-300 h-auto sm:h-178 bg-white rounded-lg ml-0 sm:ml-5 mt-3 shadow overflow-y-auto">
          {setForm()}
        </div>
      </div>
    </div>
  )
}

export default MultiForm
