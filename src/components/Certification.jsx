import { faAward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Certifications = ({ data = [], update, previous, formData }) => {
  const [certs, setCerts] = useState(data.length ? data : [{ course_name: "", institution: "", duration: "" }]);

  const navigate=useNavigate()

  const [loading, setLoading] = useState(false);


  const handleChange = (index, field, value) => {
    const updated = [...certs];
    updated[index][field] = value;
    setCerts(updated);
  };

  const addCert = () => setCerts([...certs, { course_name: "", institution: "", duration: "" }]);

  const handleSubmit = async() => {
    setLoading(true);
    const updatedCerts = certs.map(cert => ({
        ...cert,
        resume: { resume_id: localStorage.getItem("Resume ID") }
    }));

    update("certifications", updatedCerts);

    const fullFormData = { ...formData, certifications: updatedCerts };
    
    const url=`${import.meta.env.VITE_API_URL}/api/generate`
    
    const options={
        method:"POST",
        headers:{
            Authorization:`Bearer ${localStorage.getItem("Token")}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify(fullFormData)
    }
    try {
        const response=await fetch(url,options);
        if(!response.ok){
            throw new Error(response.statusText);
        }
        const data=await response.json()

        localStorage.setItem("Resume Data",JSON.stringify(data))

        navigate("/resume")
    } catch (error) {
        console.log(error);
        
    }finally{
        setLoading(false)
    }
    };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4"><FontAwesomeIcon icon={faAward} className="text-blue-600"/> Certifications</h2>
      {certs.map((cert, idx) => (
        <div key={idx} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
          <input
            placeholder="Course Name"
            value={cert.course_name}
            onChange={(e) => handleChange(idx, "course_name", e.target.value)}
            className="w-full mb-2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
          <input
            placeholder="Institution"
            value={cert.institution}
            onChange={(e) => handleChange(idx, "institution", e.target.value)}
            className="w-full mb-2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <input
            placeholder="Duration"
            value={cert.duration}
            onChange={(e) => handleChange(idx, "duration", e.target.value)}
            className="w-full mb-2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
      ))}

      <button onClick={addCert} className="text-blue-600 font-semibold mb-4">+ Add Certification</button>

      <div className="flex justify-end gap-2">
        <button onClick={previous} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">Previous</button>
        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Submit</button>
      </div>
      {loading ? (
            <div className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                ></circle>
                <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
            </svg>
            Submitting...
            </div>
        ) :null}
    </div>
  );
};

export default Certifications;
