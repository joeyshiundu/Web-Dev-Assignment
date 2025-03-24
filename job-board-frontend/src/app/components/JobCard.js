"use client"
import { useEffect, useState, useRef } from "react";
import ApplicationForm from "./ApplicationForm";

function JobCard({ job, userEmail = "" }) {
  // Complete array of SVG backgrounds
  const svgBackgrounds = [
    // Green pattern
    `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 200 200'><rect fill='100%' width='100%' height='100%'/><g fill='none' stroke='%237F3' stroke-width='1.8' stroke-opacity='0.2'><rect x='-40' y='40' width='75' height='75'/><rect x='-35' y='45' width='65' height='65'/><rect x='-30' y='50' width='55' height='55'/><rect x='-25' y='55' width='45' height='45'/><rect x='-20' y='60' width='35' height='35'/><rect x='-15' y='65' width='25' height='25'/><rect x='-10' y='70' width='15' height='15'/><rect x='-5' y='75' width='5' height='5'/><rect width='35' height='35'/><rect x='5' y='5' width='25' height='25'/><rect x='10' y='10' width='15' height='15'/><rect x='15' y='15' width='5' height='5'/><rect x='40' width='75' height='75'/><rect x='45' y='5' width='65' height='65'/><rect x='50' y='10' width='55' height='55'/><rect x='55' y='15' width='45' height='45'/><rect x='60' y='20' width='35' height='35'/><rect x='65' y='25' width='25' height='25'/><rect x='70' y='30' width='15' height='15'/><rect x='75' y='35' width='5' height='5'/><rect x='40' y='80' width='35' height='35'/><rect x='45' y='85' width='25' height='25'/><rect x='50' y='90' width='15' height='15'/><rect x='55' y='95' width='5' height='5'/><rect x='120' y='-40' width='75' height='75'/><rect x='125' y='-35' width='65' height='65'/><rect x='130' y='-30' width='55' height='55'/><rect x='135' y='-25' width='45' height='45'/><rect x='140' y='-20' width='35' height='35'/><rect x='145' y='-15' width='25' height='25'/><rect x='150' y='-10' width='15' height='15'/><rect x='155' y='-5' width='5' height='5'/><rect x='120' y='40' width='35' height='35'/><rect x='125' y='45' width='25' height='25'/><rect x='130' y='50' width='15' height='15'/><rect x='135' y='55' width='5' height='5'/><rect y='120' width='75' height='75'/><rect x='5' y='125' width='65' height='65'/><rect x='10' y='130' width='55' height='55'/><rect x='15' y='135' width='45' height='45'/><rect x='20' y='140' width='35' height='35'/><rect x='25' y='145' width='25' height='25'/><rect x='30' y='150' width='15' height='15'/><rect x='35' y='155' width='5' height='5'/><rect x='200' y='120' width='75' height='75'/><rect x='40' y='200' width='75' height='75'/><rect x='80' y='80' width='75' height='75'/><rect x='85' y='85' width='65' height='65'/><rect x='90' y='90' width='55' height='55'/><rect x='95' y='95' width='45' height='45'/><rect x='100' y='100' width='35' height='35'/><rect x='105' y='105' width='25' height='25'/><rect x='110' y='110' width='15' height='15'/><rect x='115' y='115' width='5' height='5'/><rect x='80' y='160' width='35' height='35'/><rect x='85' y='165' width='25' height='25'/><rect x='90' y='170' width='15' height='15'/><rect x='95' y='175' width='5' height='5'/><rect x='120' y='160' width='75' height='75'/><rect x='125' y='165' width='65' height='65'/><rect x='130' y='170' width='55' height='55'/><rect x='135' y='175' width='45' height='45'/><rect x='140' y='180' width='35' height='35'/><rect x='145' y='185' width='25' height='25'/><rect x='150' y='190' width='15' height='15'/><rect x='155' y='195' width='5' height='5'/><rect x='160' y='40' width='75' height='75'/><rect x='165' y='45' width='65' height='65'/><rect x='170' y='50' width='55' height='55'/><rect x='175' y='55' width='45' height='45'/><rect x='180' y='60' width='35' height='35'/><rect x='185' y='65' width='25' height='25'/><rect x='190' y='70' width='15' height='15'/><rect x='195' y='75' width='5' height='5'/><rect x='160' y='120' width='35' height='35'/><rect x='165' y='125' width='25' height='25'/><rect x='170' y='130' width='15' height='15'/><rect x='175' y='135' width='5' height='5'/><rect x='200' y='200' width='35' height='35'/><rect x='200' width='35' height='35'/><rect y='200' width='35' height='35'/></g></svg>")`,

    // Purple pattern
    `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1573' height='1573' viewBox='0 0 200 200'><rect fill='%232D21AA' width='200' height='200'/><g fill='none' stroke='%23E4FFF7' stroke-width='1.8' stroke-opacity='0.2'><rect x='-40' y='40' width='75' height='75'/><rect x='-35' y='45' width='65' height='65'/><rect x='-30' y='50' width='55' height='55'/><rect x='-25' y='55' width='45' height='45'/><rect x='-20' y='60' width='35' height='35'/><rect x='-15' y='65' width='25' height='25'/><rect x='-10' y='70' width='15' height='15'/><rect x='-5' y='75' width='5' height='5'/><rect width='35' height='35'/><rect x='5' y='5' width='25' height='25'/><rect x='10' y='10' width='15' height='15'/><rect x='15' y='15' width='5' height='5'/><rect x='40' width='75' height='75'/><rect x='45' y='5' width='65' height='65'/><rect x='50' y='10' width='55' height='55'/><rect x='55' y='15' width='45' height='45'/><rect x='60' y='20' width='35' height='35'/><rect x='65' y='25' width='25' height='25'/><rect x='70' y='30' width='15' height='15'/><rect x='75' y='35' width='5' height='5'/><rect x='40' y='80' width='35' height='35'/><rect x='45' y='85' width='25' height='25'/><rect x='50' y='90' width='15' height='15'/><rect x='55' y='95' width='5' height='5'/><rect x='120' y='-40' width='75' height='75'/><rect x='125' y='-35' width='65' height='65'/><rect x='130' y='-30' width='55' height='55'/><rect x='135' y='-25' width='45' height='45'/><rect x='140' y='-20' width='35' height='35'/><rect x='145' y='-15' width='25' height='25'/><rect x='150' y='-10' width='15' height='15'/><rect x='155' y='-5' width='5' height='5'/><rect x='120' y='40' width='35' height='35'/><rect x='125' y='45' width='25' height='25'/><rect x='130' y='50' width='15' height='15'/><rect x='135' y='55' width='5' height='5'/><rect y='120' width='75' height='75'/><rect x='5' y='125' width='65' height='65'/><rect x='10' y='130' width='55' height='55'/><rect x='15' y='135' width='45' height='45'/><rect x='20' y='140' width='35' height='35'/><rect x='25' y='145' width='25' height='25'/><rect x='30' y='150' width='15' height='15'/><rect x='35' y='155' width='5' height='5'/><rect x='200' y='120' width='75' height='75'/><rect x='40' y='200' width='75' height='75'/><rect x='80' y='80' width='75' height='75'/><rect x='85' y='85' width='65' height='65'/><rect x='90' y='90' width='55' height='55'/><rect x='95' y='95' width='45' height='45'/><rect x='100' y='100' width='35' height='35'/><rect x='105' y='105' width='25' height='25'/><rect x='110' y='110' width='15' height='15'/><rect x='115' y='115' width='5' height='5'/><rect x='80' y='160' width='35' height='35'/><rect x='85' y='165' width='25' height='25'/><rect x='90' y='170' width='15' height='15'/><rect x='95' y='175' width='5' height='5'/><rect x='120' y='160' width='75' height='75'/><rect x='125' y='165' width='65' height='65'/><rect x='130' y='170' width='55' height='55'/><rect x='135' y='175' width='45' height='45'/><rect x='140' y='180' width='35' height='35'/><rect x='145' y='185' width='25' height='25'/><rect x='150' y='190' width='15' height='15'/><rect x='155' y='195' width='5' height='5'/><rect x='160' y='40' width='75' height='75'/><rect x='165' y='45' width='65' height='65'/><rect x='170' y='50' width='55' height='55'/><rect x='175' y='55' width='45' height='45'/><rect x='180' y='60' width='35' height='35'/><rect x='185' y='65' width='25' height='25'/><rect x='190' y='70' width='15' height='15'/><rect x='195' y='75' width='5' height='5'/><rect x='160' y='120' width='35' height='35'/><rect x='165' y='125' width='25' height='25'/><rect x='170' y='130' width='15' height='15'/><rect x='175' y='135' width='5' height='5'/><rect x='200' y='200' width='35' height='35'/><rect x='200' width='35' height='35'/><rect y='200' width='35' height='35'/></g></svg>")`,

    // Red pattern
    `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1573' height='1573' viewBox='0 0 200 200'><rect fill='%23A00000' width='200' height='200'/><g fill='none' stroke='%23E4FFF7' stroke-width='1.8' stroke-opacity='0.2'><rect x='-40' y='40' width='75' height='75'/><rect x='-35' y='45' width='65' height='65'/><rect x='-30' y='50' width='55' height='55'/><rect x='-25' y='55' width='45' height='45'/><rect x='-20' y='60' width='35' height='35'/><rect x='-15' y='65' width='25' height='25'/><rect x='-10' y='70' width='15' height='15'/><rect x='-5' y='75' width='5' height='5'/><rect width='35' height='35'/><rect x='5' y='5' width='25' height='25'/><rect x='10' y='10' width='15' height='15'/><rect x='15' y='15' width='5' height='5'/><rect x='40' width='75' height='75'/><rect x='45' y='5' width='65' height='65'/><rect x='50' y='10' width='55' height='55'/><rect x='55' y='15' width='45' height='45'/><rect x='60' y='20' width='35' height='35'/><rect x='65' y='25' width='25' height='25'/><rect x='70' y='30' width='15' height='15'/><rect x='75' y='35' width='5' height='5'/><rect x='40' y='80' width='35' height='35'/><rect x='45' y='85' width='25' height='25'/><rect x='50' y='90' width='15' height='15'/><rect x='55' y='95' width='5' height='5'/><rect x='120' y='-40' width='75' height='75'/><rect x='125' y='-35' width='65' height='65'/><rect x='130' y='-30' width='55' height='55'/><rect x='135' y='-25' width='45' height='45'/><rect x='140' y='-20' width='35' height='35'/><rect x='145' y='-15' width='25' height='25'/><rect x='150' y='-10' width='15' height='15'/><rect x='155' y='-5' width='5' height='5'/><rect x='120' y='40' width='35' height='35'/><rect x='125' y='45' width='25' height='25'/><rect x='130' y='50' width='15' height='15'/><rect x='135' y='55' width='5' height='5'/><rect y='120' width='75' height='75'/><rect x='5' y='125' width='65' height='65'/><rect x='10' y='130' width='55' height='55'/><rect x='15' y='135' width='45' height='45'/><rect x='20' y='140' width='35' height='35'/><rect x='25' y='145' width='25' height='25'/><rect x='30' y='150' width='15' height='15'/><rect x='35' y='155' width='5' height='5'/><rect x='200' y='120' width='75' height='75'/><rect x='40' y='200' width='75' height='75'/><rect x='80' y='80' width='75' height='75'/><rect x='85' y='85' width='65' height='65'/><rect x='90' y='90' width='55' height='55'/><rect x='95' y='95' width='45' height='45'/><rect x='100' y='100' width='35' height='35'/><rect x='105' y='105' width='25' height='25'/><rect x='110' y='110' width='15' height='15'/><rect x='115' y='115' width='5' height='5'/><rect x='80' y='160' width='35' height='35'/><rect x='85' y='165' width='25' height='25'/><rect x='90' y='170' width='15' height='15'/><rect x='95' y='175' width='5' height='5'/><rect x='120' y='160' width='75' height='75'/><rect x='125' y='165' width='65' height='65'/><rect x='130' y='170' width='55' height='55'/><rect x='135' y='175' width='45' height='45'/><rect x='140' y='180' width='35' height='35'/><rect x='145' y='185' width='25' height='25'/><rect x='150' y='190' width='15' height='15'/><rect x='155' y='195' width='5' height='5'/><rect x='160' y='40' width='75' height='75'/><rect x='165' y='45' width='65' height='65'/><rect x='170' y='50' width='55' height='55'/><rect x='175' y='55' width='45' height='45'/><rect x='180' y='60' width='35' height='35'/><rect x='185' y='65' width='25' height='25'/><rect x='190' y='70' width='15' height='15'/><rect x='195' y='75' width='5' height='5'/><rect x='160' y='120' width='35' height='35'/><rect x='165' y='125' width='25' height='25'/><rect x='170' y='130' width='15' height='15'/><rect x='175' y='135' width='5' height='5'/><rect x='200' y='200' width='35' height='35'/><rect x='200' width='35' height='35'/><rect y='200' width='35' height='35'/></g></svg>")`,

    // Teal pattern
    `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='2000' height='2000' viewBox='0 0 200 200'><rect fill='%2309ECD4' width='200' height='200'/><g fill='none' stroke='%23000000' stroke-width='1.8' stroke-opacity='0.2'><rect x='-40' y='40' width='75' height='75'/><rect x='-35' y='45' width='65' height='65'/><rect x='-30' y='50' width='55' height='55'/><rect x='-25' y='55' width='45' height='45'/><rect x='-20' y='60' width='35' height='35'/><rect x='-15' y='65' width='25' height='25'/><rect x='-10' y='70' width='15' height='15'/><rect x='-5' y='75' width='5' height='5'/><rect width='35' height='35'/><rect x='5' y='5' width='25' height='25'/><rect x='10' y='10' width='15' height='15'/><rect x='15' y='15' width='5' height='5'/><rect x='40' width='75' height='75'/><rect x='45' y='5' width='65' height='65'/><rect x='50' y='10' width='55' height='55'/><rect x='55' y='15' width='45' height='45'/><rect x='60' y='20' width='35' height='35'/><rect x='65' y='25' width='25' height='25'/><rect x='70' y='30' width='15' height='15'/><rect x='75' y='35' width='5' height='5'/><rect x='40' y='80' width='35' height='35'/><rect x='45' y='85' width='25' height='25'/><rect x='50' y='90' width='15' height='15'/><rect x='55' y='95' width='5' height='5'/><rect x='120' y='-40' width='75' height='75'/><rect x='125' y='-35' width='65' height='65'/><rect x='130' y='-30' width='55' height='55'/><rect x='135' y='-25' width='45' height='45'/><rect x='140' y='-20' width='35' height='35'/><rect x='145' y='-15' width='25' height='25'/><rect x='150' y='-10' width='15' height='15'/><rect x='155' y='-5' width='5' height='5'/><rect x='120' y='40' width='35' height='35'/><rect x='125' y='45' width='25' height='25'/><rect x='130' y='50' width='15' height='15'/><rect x='135' y='55' width='5' height='5'/><rect y='120' width='75' height='75'/><rect x='5' y='125' width='65' height='65'/><rect x='10' y='130' width='55' height='55'/><rect x='15' y='135' width='45' height='45'/><rect x='20' y='140' width='35' height='35'/><rect x='25' y='145' width='25' height='25'/><rect x='30' y='150' width='15' height='15'/><rect x='35' y='155' width='5' height='5'/><rect x='200' y='120' width='75' height='75'/><rect x='40' y='200' width='75' height='75'/><rect x='80' y='80' width='75' height='75'/><rect x='85' y='85' width='65' height='65'/><rect x='90' y='90' width='55' height='55'/><rect x='95' y='95' width='45' height='45'/><rect x='100' y='100' width='35' height='35'/><rect x='105' y='105' width='25' height='25'/><rect x='110' y='110' width='15' height='15'/><rect x='115' y='115' width='5' height='5'/><rect x='80' y='160' width='35' height='35'/><rect x='85' y='165' width='25' height='25'/><rect x='90' y='170' width='15' height='15'/><rect x='95' y='175' width='5' height='5'/><rect x='120' y='160' width='75' height='75'/><rect x='125' y='165' width='65' height='65'/><rect x='130' y='170' width='55' height='55'/><rect x='135' y='175' width='45' height='45'/><rect x='140' y='180' width='35' height='35'/><rect x='145' y='185' width='25' height='25'/><rect x='150' y='190' width='15' height='15'/><rect x='155' y='195' width='5' height='5'/><rect x='160' y='40' width='75' height='75'/><rect x='165' y='45' width='65' height='65'/><rect x='170' y='50' width='55' height='55'/><rect x='175' y='55' width='45' height='45'/><rect x='180' y='60' width='35' height='35'/><rect x='185' y='65' width='25' height='25'/><rect x='190' y='70' width='15' height='15'/><rect x='195' y='75' width='5' height='5'/><rect x='160' y='120' width='35' height='35'/><rect x='165' y='125' width='25' height='25'/><rect x='170' y='130' width='15' height='15'/><rect x='175' y='135' width='5' height='5'/><rect x='200' y='200' width='35' height='35'/><rect x='200' width='35' height='35'/><rect y='200' width='35' height='35'/></g></svg>")`
  ];

  const [randomBackground, setRandomBackground] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const modalRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [hasFormChanges, setHasFormChanges] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * svgBackgrounds.length);
    setRandomBackground(svgBackgrounds[randomIndex]);
    
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const handleApplyClick = (e) => {
    e.preventDefault();
    setShowApplicationForm(true);
    setIsHovered(false);
    setHasFormChanges(false);
  };

  const handleCloseForm = () => {
    if (!hasFormChanges || window.confirm("You have unsaved changes. Are you sure you want to close?")) {
      setShowApplicationForm(false);
    }
  };

  const handleMouseEnter = () => {
    if (!showApplicationForm) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!showApplicationForm) {
      setIsHovered(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      if (!hasFormChanges) {
        handleCloseForm();
      } else {
        closeTimerRef.current = setTimeout(() => {
          handleCloseForm();
        }, 1000);
      }
    }
  };

  const handleModalMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
  };

  const handleFormChange = () => {
    setHasFormChanges(true);
  };

  return (
    <>
      <div 
        className="flex bg-white border border-gray-200 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="w-1/3 bg-cover bg-center rounded-l-2xl bg-gray-100"
          style={{ backgroundImage: randomBackground }}
          aria-label="Decorative background"
        ></div>

        <div className="w-2/3 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h2>
          <p className="text-gray-500 text-lg mb-1">{job.company} - {job.location}</p>
          <p className="text-green-600 text-lg font-semibold mb-4">${job.salary.toLocaleString()}</p>
          
          <button 
            onClick={handleApplyClick}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition duration-300 z-10 relative"
          >
            Apply Now
          </button>
          
          {isHovered && (
            <div className="absolute inset-0 bg-white bg-opacity-90 rounded-2xl p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Job Description</h3>
              <p className="text-gray-700 mb-4 flex-grow">{job.description}</p>
            </div>
          )}
        </div>
      </div>

      {showApplicationForm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
          onMouseEnter={handleModalMouseEnter}
        >
          <div 
            ref={modalRef}
            className="bg-white p-6 rounded-lg max-w-lg w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <ApplicationForm 
              jobId={job.id} 
              userEmail={userEmail}
              onClose={handleCloseForm}
              onChange={handleFormChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default JobCard;