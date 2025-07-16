import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const WorkExperience = ({ data = [], update, next, previous }) => {
  const [experiences, setExperiences] = useState(
    data.length ? data : [{ company_name: "", role: "", work_exp: "", employee_type: "", work_mode: "" }]
  );

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const addExperience = () =>
    setExperiences([
      ...experiences,
      { company_name: "", role: "", work_exp: "", employee_type: "", work_mode: "" },
    ]);

  const handleNext = () => {
    const updatedList = experiences.map((exp) => ({
      ...exp,
      resume: { resume_id: localStorage.getItem("Resume ID") },
    }));
    update("workExperiences", updatedList);
    next();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        <FontAwesomeIcon icon={faBriefcase} className="text-blue-600" /> Work Experience
      </h2>
      {experiences.map((exp, idx) => (
        <div key={idx} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            placeholder="Company"
            value={exp.company_name}
            onChange={(e) => handleChange(idx, "company_name", e.target.value)}
            className="w-full mb-2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input
            placeholder="Role"
            value={exp.role}
            onChange={(e) => handleChange(idx, "role", e.target.value)}
            className="w-full mb-2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
          <input
            placeholder="Internship / Full-Time"
            value={exp.employee_type}
            onChange={(e) => handleChange(idx, "employee_type", e.target.value)}
            className="w-full mb-2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode</label>
          <input
            placeholder="Remote / On-site"
            value={exp.work_mode}
            onChange={(e) => handleChange(idx, "work_mode", e.target.value)}
            className="w-full mb-2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <input
            placeholder="Duration"
            value={exp.work_exp}
            onChange={(e) => handleChange(idx, "work_exp", e.target.value)}
            className="w-full mb-2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
      ))}
      <button onClick={addExperience} className="text-blue-600 font-semibold mb-6">
        + Add Experience
      </button>
      <div className="flex justify-end gap-2">
        <button onClick={previous} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">
          Previous
        </button>
        <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkExperience;
