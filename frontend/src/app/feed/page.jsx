export default function FeedPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Community Feed</h1>
      
      {/* Post Input */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <textarea 
          placeholder="Share your progress..." 
          className="w-full border p-2 rounded-md mb-2"
        />
        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Post</button>
        </div>
      </div>

      {/* Mock Post */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
          <p className="font-bold">Alex Johnson</p>
        </div>
        <p className="text-gray-800">Just finished day 1 of the 30-day challenge! Feeling pumped. 💪</p>
      </div>
    </div>
  );
}