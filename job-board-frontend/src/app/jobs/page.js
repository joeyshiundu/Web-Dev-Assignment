"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard"; // Import JobCard component

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  // Filter jobs based on search input
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
     <Navbar />
        <div className="min-h-screen mx-6 ">
       <h1 className="text-4xl font-bold text-center mb-6">Available Jobs</h1>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-6">
         <input
            type="text"
            placeholder="Search jobs..."
            className="w-full px-4 py-2 border rounded-lg shadow-sm bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}

          />
        </div>

       {/* Job Listings */}
       {filteredJobs.length === 0 ? (
         <p className="text-center text-gray-600">No jobs found.</p>
       ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} /> // Use JobCard component
           ))}
         </div>
       )}
    </div>
    </div>
    
  );
}
