"use client"
import Link from "next/link";
import Navbar from "./components/Navbar";

import { useEffect, useState } from "react";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/jobs") // Fetch jobs from backend
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Welcome to Job Board</h1>
      <p className="text-gray-600 mt-2">Find your dream job or hire top talent.</p>
      
        {jobs.map((job) => (
        <div key={job._id} className="border p-4 mb-2">
          <h2 className="text-xl">{job.title}</h2>
          <p>{job.company} - {job.location}</p>
          <p>{job.salary}</p>
          <a href={`/job/${job._id}`} className="text-blue-500">View Details</a>
        </div>
      ))}

    <div className="mt-4">
        <Link href="/jobs" className="bg-blue-500 text-white p-2 rounded">Browse Jobs</Link>
        <Link href="/dashboard" className="ml-4 bg-green-500 text-white p-2 rounded">Employer Dashboard</Link>
      </div>
    </div>
  );
}
