"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import JobCard from "./components/JobCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayJobs, setDisplayJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        shuffleAndSetJobs(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      shuffleAndSetJobs(jobs);
    }, 5000);
    return () => clearInterval(interval);
  }, [jobs]);

  const shuffleAndSetJobs = (jobsList) => {
    if (jobsList.length > 0) {
      const shuffled = [...jobsList].sort(() => 0.5 - Math.random()).slice(0, 3);
      setDisplayJobs(shuffled);
    }
  };

  const filteredJobs = displayJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 text-center mx-6 rounded-b-2xl">
        <h1 className="text-4xl font-bold">Find Your Dream Job</h1>
        <p className="text-lg mt-2">Discover top job opportunities or hire top talent.</p>
        <div className="mt-6">
          <Link href="/jobs" className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow-md">Browse Jobs</Link>
          <Link href="/dashboard" className="ml-4 bg-green-500 text-white px-6 py-2 rounded-full font-semibold shadow-md">Post a Job</Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto p-6">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />

        {filteredJobs.length === 0 ? (
          <p className="text-gray-600">No jobs found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
