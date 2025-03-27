"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth); // Listen for auth changes

    return () => window.removeEventListener("storage", checkAuth); // Cleanup listener
  }, []);

  const isActive = (path) => (pathname === path ? "text-blue-500 font-bold" : "text-gray-700");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/"); // Redirect to homepage
  };

  return (
    <nav className="bg-slate-800 shadow-md p-8 flex justify-between items-center rounded-b-2xl">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        Job Board
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link href="/" className={isActive("/")}>Home</Link>
        <Link href="/jobs" className={isActive("/jobs")}>Jobs</Link>
        <Link href="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="text-gray-700 hover:text-blue-500 font-bold">
            Log Out
          </button>
        ) : (
          <Link href="/auth/login" className={isActive("/auth/login")}>
            Login
          </Link>
        )}

        <Link href="/auth/register" className={isActive("/auth/register")}>Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
