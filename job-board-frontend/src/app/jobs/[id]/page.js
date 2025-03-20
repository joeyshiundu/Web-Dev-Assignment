"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.company} - {job.location}</p>
      <p className="mt-4">{job.description}</p>
      <p className="mt-2"><strong>Salary:</strong> {job.salary}</p>
    </div>
  );
}
