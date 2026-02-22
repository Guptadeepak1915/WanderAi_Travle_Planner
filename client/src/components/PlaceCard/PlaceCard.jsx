import { FaStar, FaMapMarkerAlt, FaWalking } from 'react-icons/fa';
import { saveHistory } from '../../services/api';
import { useState } from 'react';
import PlaceModal from '../PlaceModal/PlaceModal';

const PlaceCard = ({ place, city }) => {
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (placeData, aiTip) => {
    try {
      await saveHistory({
        placeName: placeData.name,
        placeId: placeData.placeId,
        city: city,
        coordinates: placeData.coordinates,
        aiTip: aiTip?.tip || ''
      });
      setSaved(true);
    } catch (error) {
      console.log('History save error:', error);
    }
  };

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setShowModal(true)}
        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={place.photo}
            alt={place.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          {/* Distance Badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-purple-700">
            <FaWalking />
            {place.distance ? `${place.distance} km` : 'N/A'}
          </div>
          {/* Saved Badge */}
          {saved && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              ✓ Saved
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
            {place.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3 flex items-center gap-1 line-clamp-1">
            <FaMapMarkerAlt className="text-purple-500 flex-shrink-0" />
            {place.address}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">
                {place.rating !== 'N/A' ? place.rating : 'No rating'}
              </span>
            </div>
            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
              {place.category}
            </span>
          </div>

          <div className="mt-3 text-center text-purple-600 text-sm font-medium">
            Tap for details →
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <PlaceModal
          place={place}
          city={city}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          saved={saved}
        />
      )}
    </>
  );
};

export default PlaceCard;