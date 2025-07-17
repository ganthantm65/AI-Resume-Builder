import { faDownload, faFile, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/FormContext";
import Classic from "./templates/Classic";
import Modern from "./templates/Modern";
import { PDFExport, usePDF } from '@react-pdf/renderer';
import ReactToPdf from "react-to-pdf";

const Result = () => {
  const { formData } = useData();
  const [template, setTemplate] = useState("modern");
  const navigate = useNavigate();
  const pdfRef = useRef();

  useEffect(() => {
    if (formData.generatedContent) {
      let cleaned = formData.generatedContent.trim();
      if (/^Here is (the|a) (professional )?resume|^Here is (your )?information/i.test(cleaned)) {
        const dashIndex = cleaned.indexOf('---');
        if (dashIndex !== -1) {
          cleaned = cleaned.slice(dashIndex + 3).trim();
        } else {
          cleaned = cleaned.split('\n').slice(1).join('\n').trim();
        }
      }
      const updatedData = { ...formData, generatedContent: cleaned };
      localStorage.setItem('Resume Data', JSON.stringify(updatedData));
    }
  }, [formData]);

  const handleTemplateChange = () => {
    setTemplate(template === "modern" ? "classic" : "modern");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10 px-4 md:px-8">
      <div className="flex justify-end gap-4 px-4 md:px-6 py-4">
        <button
          onClick={handleTemplateChange}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <FontAwesomeIcon icon={faPalette} className="mr-2" />
          Switch to {template === 'modern' ? 'Classic' : 'Modern'} Template
        </button>
        <button
          onClick={() => navigate("/form")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FontAwesomeIcon icon={faFile} className="mr-2" />
          Edit Resume
        </button>
        <ReactToPdf targetRef={pdfRef} filename="resume.pdf" options={{ orientation: 'portrait', unit: 'in', format: 'letter' }} scale={0.8} x={0} y={0}>
          {({ toPdf }) => (
            <button
              onClick={toPdf}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Download PDF
            </button>
          )}
        </ReactToPdf>
      </div>

      <div ref={pdfRef} className="bg-white shadow-xl p-6 rounded-lg">
        {template === "modern" ? (
          <Modern formData={formData} />
        ) : (
          <Classic formData={formData} />
        )}
      </div>
    </div>
  );
};

export default Result;
