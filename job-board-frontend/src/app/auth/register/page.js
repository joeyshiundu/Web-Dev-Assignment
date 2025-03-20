"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Registration successful! Implement backend logic here.");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="border p-4">
        <input name="name" placeholder="Full Name" className="border p-2 w-full mb-2" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" className="border p-2 w-full mb-2" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="border p-2 w-full mb-2" value={form.password} onChange={handleChange} required />
        <button type="submit" className="bg-green-500 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
}
