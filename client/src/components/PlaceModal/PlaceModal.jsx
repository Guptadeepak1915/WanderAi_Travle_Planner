import { FaTimes, FaMapMarkerAlt, FaWalking, FaStar, FaClock, FaWikipediaW, FaRobot, FaSpinner } from 'react-icons/fa';
import { getAITips } from '../../services/api';
import { useState } from 'react';

const PlaceModal = ({ place, city, onClose, onSave, saved }) => {
  const [aiTip, setAiTip] = useState(null);
  const [loadingTip, setLoadingTip] = useState(false);

  const handleGetTip = async () => {
    setLoadingTip(true);
    try {
      const res = await getAITips({ placeName: place.name, city });
      setAiTip(res.data.ai);
    } catch (error) {
      console.log('AI tip error:', error);
    } finally {
      setLoadingTip(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/90 text-gray-600 hover:text-red-500 p-2 rounded-full shadow-md z-20 transition"
        >
          <FaTimes size={18} />
        </button>

        {/* Image */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl">
          <img
            src={place.photo}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white">{place.name}</h2>
            <p className="text-white/80 text-sm flex items-center gap-1 mt-1">
              <FaMapMarkerAlt />
              {place.address}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-yellow-50 rounded-2xl p-3 text-center">
              <FaStar className="text-yellow-400 mx-auto mb-1" />
              <p className="text-sm font-bold text-gray-800">
                {place.rating !== 'N/A' ? place.rating : 'N/A'}
              </p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-3 text-center">
              <FaWalking className="text-purple-600 mx-auto mb-1" />
              <p className="text-sm font-bold text-gray-800">
                {place.distance ? `${place.distance} km` : 'N/A'}
              </p>
              <p className="text-xs text-gray-500">Distance</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <FaClock className="text-green-600 mx-auto mb-1" />
              <p className="text-xs font-bold text-gray-800">
                {place.openingHours || 'N/A'}
              </p>
              <p className="text-xs text-gray-500">Hours</p>
            </div>
          </div>

          {/* Category Badge */}
          <span className="inline-block bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full mb-4">
            {place.category}
          </span>

          {/* Wikipedia Link */}
          {place.wiki && (
            <div className="mb-4">
              <a
                href={`https://en.wikipedia.org/wiki/${place.wiki.replace('en:', '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
              >
                <FaWikipediaW />
                Read on Wikipedia
              </a>
            </div>
          )}

          {/* AI Tips Section */}
          {aiTip ? (
            <div className="bg-purple-50 rounded-2xl p-4 mb-4">
              <p className="text-purple-800 font-bold mb-2 flex items-center gap-2">
                <FaRobot /> WanderAI Tips
              </p>
              <p className="text-gray-700 text-sm mb-3">{aiTip.tip}</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  ⏰ <span className="font-medium">Best time:</span> {aiTip.bestTime}
                </p>
                <p className="text-sm text-gray-600">
                  🍛 <span className="font-medium">Local food:</span> {aiTip.localFood}
                </p>
                {aiTip.highlights?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      ✨ Highlights:
                    </p>
                    <ul className="space-y-1">
                      {aiTip.highlights.map((h, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-1">
                          <span className="text-purple-500 mt-0.5">•</span> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {aiTip.warning && (
                  <p className="text-sm text-red-500 mt-2">
                    ⚠️ {aiTip.warning}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={handleGetTip}
              disabled={loadingTip}
              className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-2xl hover:bg-purple-50 transition font-medium flex items-center justify-center gap-2 mb-4"
            >
              {loadingTip ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Getting AI Tips...
                </>
              ) : (
                <>
                  <FaRobot />
                  Get AI Travel Tips
                </>
              )}
            </button>
          )}

          {/* Save Button */}
          <button
            onClick={() => onSave(place, aiTip)}
            disabled={saved}
            className={`w-full py-3 rounded-2xl font-semibold text-lg transition ${
              saved
                ? 'bg-green-500 text-white cursor-default'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {saved ? '✓ Saved to History!' : 'Save to History'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default PlaceModal;