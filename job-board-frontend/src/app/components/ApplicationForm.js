"use client"
import { useState, useEffect } from "react";

const ApplicationForm = ({ jobId, userEmail, onClose }) => {
  const [formData, setFormData] = useState({
    job_id: "",
    email: "", // Changed from user_id to email
    cover_letter: "",
    status: "pending",
    applied_at: new Date().toISOString().slice(0, 19).replace("T", " "),
  });

  useEffect(() => {
    // Auto-fill job_id and email when component mounts
    setFormData(prev => ({
      ...prev,
      job_id: jobId,
      email: userEmail
    }));
  }, [jobId, userEmail]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application Submitted:", formData);
    // You can integrate an API call here to save the data
    // After successful submission:
    onClose();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-md">
      <h2 className="text-xl font-semibold mb-4">Job Application Form</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Job ID:
          <input
            type="text"
            name="job_id"
            value={formData.job_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            readOnly
          />
        </label>
        
        <label className="block mb-2">
          Your Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            readOnly={!!userEmail} // Only readonly if userEmail is provided
          />
        </label>

        <label className="block mb-2">
          Cover Letter:
          <textarea
            name="cover_letter"
            value={formData.cover_letter}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="5"
            required
          />
        </label>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;