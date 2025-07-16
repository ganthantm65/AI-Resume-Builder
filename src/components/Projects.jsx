import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Projects = ({ data = [], update, next, previous }) => {
  const [projects, setProjects] = useState(data.length ? data : [{ title: "", description: "", repo_url: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const addProject = () => setProjects([...projects, { title: "", description: "", repo_url: "" }]);

  const handleNext = () => {
    const updatedList = projects.map(project => ({
        ...project,
        resume: { resume_id: localStorage.getItem('Resume ID') }
    }));
    update("projects", updatedList);
    next();
    };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4"><FontAwesomeIcon icon={faProjectDiagram} className="text-blue-600"/> Projects</h2>
      {projects.map((project, idx) => (
        <div key={idx} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => handleChange(idx, "title", e.target.value)}
            className="w-full mb-2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            placeholder="Description"
            value={project.description}
            onChange={(e) => handleChange(idx, "description", e.target.value)}
            className="w-full mb-2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">Repository URL</label>
          <input
            placeholder="GitHub URL"
            value={project.repo_url}
            onChange={(e) => handleChange(idx, "repo_url", e.target.value)}
            className="w-full mb-2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
      ))}
      <button onClick={addProject} className="text-blue-600 font-semibold mb-6">+ Add Project</button>
      <div className="flex justify-end gap-2">
        <button onClick={previous} className="bg-gray-300  px-4 py-2 rounded-lg hover:bg-gray-400">Previous</button>
        <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800">Next</button>
      </div>
    </div>
  );
};

export default Projects;
