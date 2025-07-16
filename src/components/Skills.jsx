import { faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Skills = ({ data = [], update, next, previous }) => {
  const [skills, setSkills] = useState(
    data.length ? data.map(skill => (typeof skill === "string" ? skill : skill.skill_name)) : [""]
  );

  const handleChange = (value, index) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const addSkill = () => setSkills([...skills, ""]);

  const handleNext = () => {
    const resumeId = localStorage.getItem("Resume ID");
    const updatedSkills = skills.map(skill => ({
      skill_name: skill.trim(), // ensure it's a clean string
      resume: { resume_id: resumeId }
    }));
    update("skills", updatedSkills);
    next();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        <FontAwesomeIcon icon={faTools} className="text-2xl text-blue-600" /> Skills
      </h2>

      {skills.map((skill, idx) => (
        <input
          key={idx}
          value={skill}
          onChange={(e) => handleChange(e.target.value, idx)}
          placeholder={`Skill #${idx + 1}`}
          className="w-full mb-3 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
      ))}

      <button onClick={addSkill} className="text-blue-600 font-semibold mb-6">
        + Add Skill
      </button>

      <div className="flex justify-end gap-2">
        <button onClick={previous} className="bg-gray-300 text-black px-4 py-2 rounded-lg">
          Previous
        </button>
        <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
};

export default Skills;
