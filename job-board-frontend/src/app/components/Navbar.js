"use client";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path) => pathname === path ? "text-blue-500 font-bold" : "text-gray-700";

  return (
    <nav className="bg-slate-800 shadow-md p-8 flex justify-between items-center rounded-b-2xl">
      {/* Logo */}
      <a href="/" className="text-2xl font-bold text-blue-600">Job Board</a>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <a href="/" className={isActive("/")}>Home</a>
        <a href="/jobs" className={isActive("/jobs")}>Jobs</a>
        <a href="/dashboard" className={isActive("/dashboard")}>Dashboard</a>
        <a href="/auth/login" className={isActive("/login")}>Login</a>
        <a href="/auth/register" className={isActive("/register")}>Register</a>
      </div>
    </nav>
  );
}

export default Navbar;