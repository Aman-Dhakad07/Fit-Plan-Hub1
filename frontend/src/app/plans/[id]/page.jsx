"use client";
import React, { use } from "react"; 

export default function PlanDetails({ params }) {

  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-4">Plan Details (ID: {id})</h1>
        <p className="text-gray-600 mb-6">
          This is a detailed description of the workout plan. Here you would fetch data using the ID.
        </p>
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Start This Plan
        </button>
      </div>
    </div>
  );
}