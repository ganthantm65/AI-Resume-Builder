import { faFile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import resumeBanner from '../assets/images/resume_banner.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faCheck, faRobot } from '@fortawesome/free-solid-svg-icons';
import { faWpforms } from '@fortawesome/free-brands-svg-icons';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col items-center justify-between">
      <div className="w-full h-16 flex items-center pl-10 mt-4">
        <h1 className="font-monts font-extrabold text-3xl text-gray-800">
          <FontAwesomeIcon icon={faFile} className="mr-2 text-blue-600" />
          CraftCV
        </h1>
      </div>

      <div className="w-full h-auto flex flex-col md:flex-row items-center justify-evenly px-4 mt-6 md:gap-10">
        <img
          src={resumeBanner}
          alt="Resume Banner"
          className="w-100 h-100 rounded-xl object-cover"
        />

        <div className="flex flex-col items-center md:items-start gap-6 max-w-xl text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold font-roboto text-gray-900">
            Your Resume, Smarter
          </h1>
          <p className="text-base md:text-lg text-gray-700 font-roboto leading-relaxed">
            Build a job-winning resume in minutes with our <span className="font-semibold text-gray-900">AI-Poweblue Resume Builder</span>.
            Whether you're a fresher or a professional, our tool offers smart suggestions, modern templates, and instant downloads —
            <span className="font-semibold"> no design skills or login requiblue.</span>
          </p>
          <button
            onClick={() => navigate('/auth/login')}
            className="w-40 h-12 bg-blue-600 text-white font-monts text-sm rounded-lg cursor-pointer hover:bg-blue-800 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="w-full px-6 md:px-20 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="flex flex-col items-center gap-2 rounded-lg shadow-lg text-center p-6">
          <h3 className="font-semibold text-xl text-blue-600">AI-Based Resume</h3>
          <FontAwesomeIcon icon={faRobot} className='text-blue-600 text-5xl'/>
          <p className="text-sm text-gray-600 mt-2">Generate tailoblue resumes using advanced AI trained on industry job descriptions.</p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg shadow-lg text-center p-6">
          <h3 className="font-semibold text-xl text-blue-600">Dynamic Form</h3>
          <FontAwesomeIcon icon={faWpforms} className='text-5xl text-blue-600'/>
          <p className="text-sm text-gray-600 mt-2">Easily enter personal, educational, skills, and project details through structublue steps.</p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg shadow-lg text-center p-6">
          <h3 className="font-semibold text-xl text-blue-600">ATS Friendly</h3>
          <FontAwesomeIcon icon={faCheck} className='text-5xl text-blue-600'/>
          <p className="text-sm text-gray-600 mt-2">Designed to pass applicant tracking systems with clear, scannable formatting.</p>
        </div>
      </div>

      <footer className="w-full mt-16 bg-blue-600 text-white py-6 text-center text-sm font-semibold tracking-wide">
        © 2025 CraftCV
      </footer>
    </div>
  );
};

export default LandingPage;
