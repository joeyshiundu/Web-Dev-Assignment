"use client"
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" className="border p-2 w-full" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 w-full" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
      </form>
    </div>
  );
}
