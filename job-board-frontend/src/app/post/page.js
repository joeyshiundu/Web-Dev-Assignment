"use client";

import { useState } from "react";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) alert("Job posted successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Post a Job</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="border p-2 w-full" type="text" name="title" placeholder="Job Title" onChange={handleChange} />
        <input className="border p-2 w-full" type="text" name="company" placeholder="Company Name" onChange={handleChange} />
        <input className="border p-2 w-full" type="text" name="location" placeholder="Location" onChange={handleChange} />
        <input className="border p-2 w-full" type="text" name="salary" placeholder="Salary" onChange={handleChange} />
        <textarea className="border p-2 w-full" name="description" placeholder="Job Description" onChange={handleChange}></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Post Job</button>
      </form>
    </div>
  );
}
