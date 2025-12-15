"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation"; // Import Router for redirect

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const [status, setStatus] = useState(""); // For success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Signing up...");

    try {
      // ✅ We use the hardcoded URL to ensure it connects
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);

      if (res.data) {
        setStatus("Account Created! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error: " + (err.response?.data?.message || "Signup failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        
        {/* Show Status Message */}
        {status && (
          <div className={`p-3 mb-4 text-sm rounded ${status.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="mt-1 w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-500" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="mt-1 w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-500" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="mt-1 w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-500" 
              required 
            />
          </div>
          
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-green-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}