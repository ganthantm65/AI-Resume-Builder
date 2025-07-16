import React, { useState, useEffect, useRef } from 'react';
import SideBar from '../components/SideBar';
import { faFile, faUser, faBars, faDownload, faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePDF } from 'react-to-pdf';
import ReactMarkdown from 'react-markdown';

const Result = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [template, setTemplate] = useState('modern');
  const userName = localStorage.getItem('User Name') || 'User';
  const resumeData = localStorage.getItem('Resume Data');
  const [resumeText, setResumeText] = useState('');

  const { toPDF, targetRef } = usePDF({
    filename: 'resume.pdf',
    page: {
      margin: 20,
      format: 'a4',
      orientation: 'portrait',
    }
  });

  useEffect(() => {
    try {
      const parsed = JSON.parse(resumeData);
      if (parsed.generated_text) {
        let cleaned = parsed.generated_text;

        if (cleaned.startsWith("Here is a professional resume")) {
          const dashIndex = cleaned.indexOf('---');
          if (dashIndex !== -1) {
            cleaned = cleaned.slice(dashIndex + 3).trim();
          }
        }

        cleaned = cleaned
          .replace(/^---\s*/gm, '')
          .replace(/\s*---\s*/g, '\n')
          .replace(/^\*\*(.+?)\*\*/gm, '## $1')
          .replace(/###\s*\*\*(.+?)\*\*/g, '### $1')
          .replace(/###\s*(.+)/g, '### $1')
          .replace(/\*\*(.+?)\*\*/g, '**$1**')
          .replace(/\n\s*\n\s*\n/g, '\n\n')
          .trim();

        const linesToRemove = [
          /^\*\s*\[Add \d+-\d+ concise bullet points.*?\]/gm,
          /^\*\s*\[Example:.*?\]/gm,
          /^\*\s*\[.*?\]/gm,
          /\[Dates of Employment.*?\]/g,
          /\[Add.*?\]/g,
          /\[Example.*?\]/g,
          /Month Year.*?Month Year/g,
          /e\.g\.,.*?\]/g
        ];

        linesToRemove.forEach(pattern => {
          cleaned = cleaned.replace(pattern, '');
        });

        cleaned = cleaned
          .replace(/\n\s*\n\s*\n/g, '\n\n')
          .replace(/^\s*\*\s*$/gm, '')
          .trim();

        setResumeText(cleaned);
      }
    } catch (err) {
      console.error('Error parsing resume data:', err);
    }
  }, [resumeData]);

  const handleDownload = () => {
    toPDF();
  };

  const handleTemplateChange = () => {
    setTemplate(prev => (prev === 'modern' ? 'classic' : 'modern'));
  };

  return (
    <div className="w-screen h-screen flex bg-gray-100 dark:bg-gray-900 overflow-hidden transition-colors duration-500">
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 h-full flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 bg-white dark:bg-gray-800 shadow-md z-10">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              icon={faBars}
              className="md:hidden text-2xl cursor-pointer text-gray-700 dark:text-gray-200"
              onClick={() => setSidebarOpen(true)}
            />
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 dark:text-white font-monts tracking-wide">
              <FontAwesomeIcon icon={faFile} className="mr-2 text-blue-600" />
              CraftCV
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full shadow-sm">
            <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
            <h2 className="text-white text-sm md:text-base font-semibold font-monts capitalize">{userName}</h2>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-4 md:px-6 py-4">
          <button
            onClick={handleTemplateChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FontAwesomeIcon icon={faPalette} className="mr-2" />
            Switch to {template === 'modern' ? 'Classic' : 'Modern'} Template
          </button>
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Download PDF
          </button>
        </div>

        <div className="px-4 md:px-6 py-6">
          <div
            ref={targetRef}
            className="max-w-full rounded-xl shadow-xl p-8 transition-all duration-300 bg-white"
            style={{
              backgroundColor: template === 'classic' ? '#ffffff' : '#ffffff',
              color: '#1f2937',
              border: template === 'classic' ? '1px solid #e5e7eb' : 'none'
            }}
          >
            <ReactMarkdown
              components={{
                h1: ({ children, ...props }) => (
                  <h1 className="text-3xl font-bold mb-4 text-center border-b-4 pb-3 p-4 rounded-t-lg shadow-md"
                      style={{
                        color: '#1d4ed8',
                        borderColor: '#3b82f6',
                        backgroundColor: '#eff6ff'
                      }} {...props}>
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2 className="text-xl font-bold mt-6 mb-3 border-l-4 pl-4 pb-2 rounded-r-lg shadow-sm border-b-2"
                      style={{
                        color: '#2563eb',
                        borderLeftColor: '#60a5fa',
                        borderBottomColor: '#93c5fd',
                        backgroundColor: '#eff6ff'
                      }} {...props}>
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3 className="text-lg font-semibold mt-4 mb-2 border-l-2 pl-3 rounded-r-md"
                      style={{
                        color: '#3b82f6',
                        borderLeftColor: '#60a5fa',
                        backgroundColor: '#f0f9ff'
                      }} {...props}>
                    {children}
                  </h3>
                ),
                ul: ({ children, ...props }) => (
                  <ul className="list-disc list-inside ml-4 space-y-2 mb-4" {...props}>
                    {children}
                  </ul>
                ),
                li: ({ children, ...props }) => (
                  <li className="text-sm leading-relaxed"
                      style={{ color: '#374151' }} {...props}>
                    {children}
                  </li>
                ),
                p: ({ children, ...props }) => (
                  <p className="text-sm mb-3 leading-relaxed"
                     style={{ color: '#374151' }} {...props}>
                    {children}
                  </p>
                ),
                strong: ({ children, ...props }) => (
                  <strong className="font-bold"
                          style={{ color: '#1f2937' }} {...props}>
                    {children}
                  </strong>
                ),
                em: ({ children, ...props }) => (
                  <em className="italic"
                      style={{ color: '#4b5563' }} {...props}>
                    {children}
                  </em>
                ),
              }}
            >
              {resumeText}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
