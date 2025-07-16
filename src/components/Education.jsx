import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Education = ({ data, update, next, previous }) => {
  const [educations, setEducations] = useState(
    data && data.length > 0
      ? data
      : [
          {
            graduation: "",
            institution: "",
            start_year: "",
            end_year: "",
          },
        ]
  );

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...educations];
    updated[index][name] = value;
    setEducations(updated);
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        graduation: "",
        institution: "",
        start_year: "",
        end_year: "",
      },
    ]);
  };

  const handleNext = () => {
    const resumeId = localStorage.getItem("Resume ID");
    const updatedList = educations.map((edu) => ({
      ...edu,
      resume: { resume_id: resumeId },
    }));
    update("educations", updatedList);
    next();
  };


  const handlePrevious = () => {
    previous();
  };

  return (
    <div className="w-full px-4 py-6 sm:px-8 sm:py-8 bg-white rounded-lg">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <FontAwesomeIcon icon={faGraduationCap} className="text-blue-600" />
        Education
      </h2>

      {educations.map((edu, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Graduation
            </label>
            <input
              name="graduation"
              value={edu.graduation}
              onChange={(e) => handleChange(index, e)}
              placeholder="B.E. in Computer Science"
              className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institution
            </label>
            <input
              name="institution"
              value={edu.institution}
              onChange={(e) => handleChange(index, e)}
              placeholder="ABC University"
              className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Year
            </label>
            <input
              name="start_year"
              value={edu.start_year}
              onChange={(e) => handleChange(index, e)}
              placeholder="2014"
              className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Year
            </label>
            <input
              name="end_year"
              value={edu.end_year}
              onChange={(e) => handleChange(index, e)}
              placeholder="2018"
              className="w-full p-2 sm:p-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="text-blue-600 font-semibold mb-4"
      >
        + Add Education
      </button>

      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={handlePrevious}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg text-sm sm:text-base font-medium shadow"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm sm:text-base font-semibold shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Education;
