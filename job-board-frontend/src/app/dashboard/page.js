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
    <div>
      <Navbar />
      <div className="p-10">
      

      {/* Job Listings */}
      <h2 className="text-xl font-semibold mb-2">Your Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="border p-4 mb-2">
            <h3 className="font-semibold">{job.title}</h3>
            <p>{job.company} - {job.location}</p>
            <p>Salary: {job.salary}</p>
            <p>{job.description}</p>
          </div>
        ))
      )}


<h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>

{/* Job Posting Form */}
<form className="border p-4 mb-6" onSubmit={handleSubmit}>
  <h2 className="text-xl font-semibold mb-2">Post a Job</h2>
  <input name="title" placeholder="Job Title" className="border p-2 w-full mb-2" value={form.title} onChange={handleChange} required />
  <input name="company" placeholder="Company Name" className="border p-2 w-full mb-2" value={form.company} onChange={handleChange} required />
  <input name="location" placeholder="Location" className="border p-2 w-full mb-2" value={form.location} onChange={handleChange} required />
  <input name="salary" placeholder="Salary" className="border p-2 w-full mb-2" value={form.salary} onChange={handleChange} required />
  <textarea name="description" placeholder="Job Description" className="border p-2 w-full mb-2" value={form.description} onChange={handleChange} required />
  <button type="submit" className="bg-blue-500 text-white p-2 w-full">Post Job</button>
</form>
    </div>
    </div>
    
  );
}
