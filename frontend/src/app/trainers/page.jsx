import Link from "next/link";

const trainers = [
  { id: 101, name: "John Doe", specialty: "Strength Training" },
  { id: 102, name: "Jane Smith", specialty: "Yoga & Flexibility" },
];

export default function TrainersPage() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Our Trainers</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {trainers.map((t) => (
          <div key={t.id} className="flex items-center p-6 border rounded-lg bg-white shadow-sm">
            <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <h2 className="text-xl font-bold">{t.name}</h2>
              <p className="text-gray-600">{t.specialty}</p>
              <Link href={`/trainers/${t.id}`} className="text-blue-600 text-sm hover:underline mt-1 block">
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}