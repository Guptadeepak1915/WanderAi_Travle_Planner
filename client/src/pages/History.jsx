import { useEffect, useState } from 'react';
import { getHistory, deleteHistory } from '../services/api';
import { FaMapMarkerAlt, FaTrash, FaHistory, FaCity } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getHistory();
      setHistory(res.data.history);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHistory(id);
      setHistory(history.filter((h) => h._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // City wise group karo
  const groupedHistory = history.reduce((acc, item) => {
    const city = item.city || 'Unknown';
    if (!acc[city]) acc[city] = [];
    acc[city].push(item);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-purple-600 text-5xl animate-spin mb-4">⏳</div>
          <p className="text-purple-600 text-xl">Loading your travel history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-blue-500 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <FaHistory />
            Travel History
          </h1>
          <p className="text-purple-100 mt-2">
            {history.length} places explored across {Object.keys(groupedHistory).length} cities
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {history.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-8xl mb-6">🗺️</p>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No travel history yet!
            </h2>
            <p className="text-gray-400 mb-6">
              Start exploring cities and save places you visit
            </p>
            <Link
              to="/explore"
              className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition font-semibold"
            >
              Start Exploring 🗺️
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedHistory).map(([city, items]) => (
              <div key={city}>
                {/* City Header */}
                <div className="flex items-center gap-2 mb-4">
                  <FaCity className="text-purple-600 text-xl" />
                  <h2 className="text-xl font-bold text-gray-800">{city}</h2>
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                    {items.length} places
                  </span>
                </div>

                {/* Places List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between hover:shadow-md transition border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                          <FaMapMarkerAlt className="text-purple-600 text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {item.placeName}
                          </h3>
                          {item.aiTip && (
                            <p className="text-gray-500 text-sm mt-0.5 line-clamp-1">
                              🤖 {item.aiTip}
                            </p>
                          )}
                          <p className="text-gray-400 text-xs mt-1">
                            🕐 {new Date(item.visitedAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;