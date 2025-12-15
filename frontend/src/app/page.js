import Link from "next/link";

export default function Home() {
  console.log("My API URL is:", process.env.NEXT_PUBLIC_API_URL);
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Transform Your Body, Transform Your Life</h1>
          <p className="text-xl mb-8 text-blue-100">
            Join Fit Plan Hub to access expert workout plans, professional trainers, and a supportive community.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
              Get Started
            </Link>
            <Link href="/plans" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition">
              View Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-bold mb-2 text-gray-500">Custom Plans</h3>
            <p className="text-gray-600">Workouts tailored to your specific goals and fitness level.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-bold mb-2 text-gray-500">Expert Trainers</h3>
            <p className="text-gray-600">Get guidance from certified professionals.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-bold mb-2 text-gray-500">Community Feed</h3>
            <p className="text-gray-600">Share your progress and stay motivated with friends.</p>
          </div>
        </div>
      </section>
    </div>
  );
}






// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Home() {
//   const [status, setStatus] = useState("Checking connection...");

//   useEffect(() => {
//     // We use the environment variable we just created
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//     axios.get("http://localhost:5000/api/health"
//       // `${apiUrl}/health`
//     )
//       .then((res) => {
//         setStatus("✅ CONNECTED: " + res.data.message);
//       })
//       .catch((err) => {
//         console.error(err);
//         setStatus("❌ ERROR: Could not connect to backend.");
//       });
//   }, []);

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="p-10 bg-white rounded shadow-xl border text-center">
//         <h1 className="text-2xl font-bold mb-4">Connection Status</h1>
//         <p className={`text-lg font-mono font-bold ${status.includes("✅") ? "text-green-600" : "text-red-600"}`}>
//           {status}
//         </p>
//       </div>
//     </div>
//   );
// }