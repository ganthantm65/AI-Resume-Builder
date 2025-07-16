import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const PersonalInfo = ({ data, update, next }) => {
  const [info, setInfo] = useState(data || {});

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const updatedInfo = {
      ...info,
      resume: { resume_id: localStorage.getItem('Resume ID') }
    };
    update("personalInfo", updatedInfo);
    next();
  };


  return (
    <div className="w-full px-4 py-6 sm:px-8 sm:py-8 bg-white rounded-xl ">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <FontAwesomeIcon icon={faUser} className="text-blue-600" />
        Personal Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            name="name"
            value={info.name || ""}
            onChange={handleChange}
            placeholder="Jane Smith"
            className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email_id"
            type="email"
            value={info.email_id || ""}
            onChange={handleChange}
            placeholder="jane@example.com"
            className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input
            name="role"
            value={info.role || ""}
            onChange={handleChange}
            placeholder="Full Stack Developer"
            className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
          <input
            name="linked_url"
            value={info.linked_url || ""}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/yourname"
            className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
          <input
            name="github_url"
            value={info.github_url || ""}
            onChange={handleChange}
            placeholder="https://github.com/yourusername"
            className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-5 py-2 rounded-lg text-sm sm:text-base font-semibold shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
