"use client";
import React, { use } from "react";

export default function TrainerProfile({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="text-center">
        <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
        <h1 className="text-3xl font-bold">Trainer Profile {id}</h1>
        <p className="text-gray-600 mt-2">Certified Personal Trainer specializing in transformations.</p>
        <button className="mt-6 border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50">
          Message Trainer
        </button>
      </div>
    </div>
  );
}