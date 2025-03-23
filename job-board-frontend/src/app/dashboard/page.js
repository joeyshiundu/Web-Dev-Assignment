"use client";

import Navbar from "../components/Navbar"; // Import Navbar component
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", company: "", location: "", salary: "", description: "" });

  // Fetch jobs posted by the employer
  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new job posting
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      const newJob = await response.json();
      setJobs([...jobs, newJob]);
      setForm({ title: "", company: "", location: "", salary: "", description: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Main Container */}
      <div className="max-w-5xl mx-auto p-6">
        
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Employer Dashboard</h1>
        
        {/* Job Posting Form (Card) */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Post a Job</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              name="title" 
              placeholder="Job Title" 
              className="border border-gray-300 rounded-md p-3 w-full focus:ring focus:ring-blue-200"
              value={form.title} 
              onChange={handleChange} 
              required 
            />
            <input 
              name="company" 
              placeholder="Company Name" 
              className="border border-gray-300 rounded-md p-3 w-full focus:ring focus:ring-blue-200"
              value={form.company} 
              onChange={handleChange} 
              required 
            />
            <input 
              name="location" 
              placeholder="Location" 
              className="border border-gray-300 rounded-md p-3 w-full focus:ring focus:ring-blue-200"
              value={form.location} 
              onChange={handleChange} 
              required 
            />
            <input 
              name="salary" 
              placeholder="Salary" 
              className="border border-gray-300 rounded-md p-3 w-full focus:ring focus:ring-blue-200"
              value={form.salary} 
              onChange={handleChange} 
              required 
            />
            <textarea 
              name="description" 
              placeholder="Job Description" 
              className="border border-gray-300 rounded-md p-3 w-full h-32 focus:ring focus:ring-blue-200"
              value={form.description} 
              onChange={handleChange} 
              required 
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-full transition">
              Post Job
            </button>
          </form>
        </div>

        {/* Job Listings Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Posted Jobs</h2>
          
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                  <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-gray-600">{job.company} - {job.location}</p>
                  <p className="text-gray-700 font-medium">💰 Salary: {job.salary}</p>
                  <p className="text-gray-500 mt-2">{job.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
