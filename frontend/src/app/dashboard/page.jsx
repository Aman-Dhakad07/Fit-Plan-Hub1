"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Check for Token
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      // If no token, redirect to login
      router.push("/login");
    } else {
      // If token exists, load user data
      setUser(JSON.parse(userData));
    }
  }, [router]);

  // Prevent flashing the dashboard content while checking auth
  if (!user) return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hello, {user.name}! 👋</h1>
        <button 
          onClick={() => {
            localStorage.clear();
            router.push("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stat Cards */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-gray-500">Your Email</p>
          <p className="text-gray-500 text-lg font-bold truncate">{user.email}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-gray-500">Account Type</p>
          <p className="text-xl font-bold text-green-600">Free Member</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-500">Your Recent Activity</h2>
        <p className="text-gray-600">You just logged in! Start a plan to see progress here.</p>
      </div>
    </div>
  );
}