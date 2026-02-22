import { useState } from 'react';
import { getItinerary } from '../services/api';
import { FaSpinner, FaMapMarkerAlt, FaClock, FaRupeeSign, FaLightbulb } from 'react-icons/fa';

const Itinerary = () => {
  const [city, setCity] = useState('');
  const [hours, setHours] = useState('6');
  const [interests, setInterests] = useState('');
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const interestOptions = [
    'History & Culture', 'Food & Cuisine', 'Nature & Parks',
    'Shopping', 'Religious Sites', 'Architecture', 'Adventure'
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGenerate = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setItinerary(null);

    try {
      const res = await getItinerary({
        city,
        hours,
        interests: selectedInterests.join(', ') || 'sightseeing, food, culture'
      });
      setItinerary(res.data.ai);
    } catch (err) {
      setError('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-blue-500 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-3">
            AI Trip Planner 🤖
          </h1>
          <p className="text-purple-100 text-lg">
            Let AI plan your perfect day trip!
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Plan Your Trip
          </h2>

          {/* City Input */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              📍 City
            </label>
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Hours */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              ⏰ Duration: {hours} hours
            </label>
            <input
              type="range"
              min="2"
              max="12"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>2 hrs</span>
              <span>6 hrs</span>
              <span>12 hrs</span>
            </div>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              ✨ Interests (select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    selectedInterests.includes(interest)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !city.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <><FaSpinner className="animate-spin" /> Generating your trip...</>
            ) : (
              '🤖 Generate AI Itinerary'
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 py-4">{error}</div>
        )}

        {/* Itinerary Result */}
        {itinerary && (
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6">
              <h2 className="text-2xl font-bold text-white">
                {itinerary.title}
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 text-purple-100 text-sm">
                  <FaClock /> {itinerary.duration}
                </span>
                <span className="flex items-center gap-1 text-purple-100 text-sm">
                  <FaRupeeSign /> {itinerary.estimatedCost}
                </span>
              </div>
            </div>

            {/* Schedule */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                🗓️ Schedule
              </h3>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-100" />

                <div className="space-y-4">
                  {itinerary.schedule?.map((item, index) => (
                    <div key={index} className="flex gap-4 relative">
                      {/* Timeline dot */}
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 z-10">
                        {index + 1}
                      </div>

                      {/* Content */}
                      <div className="bg-gray-50 rounded-2xl p-4 flex-1 mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-purple-600 font-bold text-sm">
                            {item.time}
                          </span>
                          <span className="text-gray-400 text-xs flex items-center gap-1">
                            <FaClock size={10} /> {item.duration}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-800 flex items-center gap-1">
                          <FaMapMarkerAlt className="text-purple-500 text-sm" />
                          {item.place}
                        </h4>
                        <p className="text-gray-500 text-sm mt-1">
                          {item.activity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              {itinerary.tips?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FaLightbulb className="text-yellow-400" />
                    Travel Tips
                  </h3>
                  <div className="space-y-2">
                    {itinerary.tips.map((tip, index) => (
                      <div
                        key={index}
                        className="bg-yellow-50 rounded-xl p-3 text-sm text-gray-700 flex items-start gap-2"
                      >
                        <span className="text-yellow-500 mt-0.5">💡</span>
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Regenerate Button */}
              <button
                onClick={handleGenerate}
                className="w-full mt-6 border-2 border-purple-600 text-purple-600 py-3 rounded-2xl font-semibold hover:bg-purple-50 transition"
              >
                🔄 Regenerate Itinerary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Itinerary;