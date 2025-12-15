"use client"; // Required for fetching data in useEffect
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios"; // Make sure to run: npm install axios in frontend

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // 1. Get the token from Local Storage (saved during login)
        const token = localStorage.getItem("token");

        // 2. If no token, the user isn't logged in. Stop or Redirect.
        if (!token) {
            console.log("No token found, user needs to login.");
            return; 
        }
        // This grabs the URL from your .env file
        const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
        
        // 1. CALL THE BACKEND
        const response = await axios.get(  "http://localhost:5000/api/plans"
          // `${apiUrl}/plans`
          , {
            headers:{
              Authorization:`Bearer ${token}`,
            }
          }
        );
        
        // 2. STORE THE DATA
        setPlans(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to load plans from server.");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) return <div className="text-center py-10">Loading plans...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Workout Plans</h1>
      
      {/* If no plans exist in DB, show a message */}
      {plans.length === 0 && <p>No plans found in the database.</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan._id} className="border rounded-lg p-6 hover:shadow-lg transition bg-white">
            <h2 className="text-xl font-semibold mb-2">{plan.title || plan.name}</h2>
            <div className="text-sm text-gray-500 mb-4">
              <p>Difficulty: {plan.difficulty || "All Levels"}</p>
              <p>Price: ${plan.price || "Free"}</p>
            </div>
            <Link 
              href={`/plans/${plan._id}`} 
              className="block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}