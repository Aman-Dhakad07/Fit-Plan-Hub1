"use client";
import React from "react";

const subscriptions = [
  { name: "Free", price: "$0", features: ["Basic Access"] },
  { name: "Pro", price: "$29", features: ["Unlimited Plans", "Priority Support"] },
];

export default function SubscriptionsPage() {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-center text-4xl font-bold mb-12">Choose Your Plan</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {subscriptions.map((sub, idx) => (
          <div key={idx} className="border p-8 rounded-xl shadow-lg hover:scale-105 transition bg-white">
            <h2 className="text-2xl font-bold">{sub.name}</h2>
            <p className="text-4xl font-bold text-blue-600 my-4">{sub.price}</p>
            <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800">
              Select {sub.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}