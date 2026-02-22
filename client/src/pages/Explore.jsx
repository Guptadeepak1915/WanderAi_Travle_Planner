import { useState,useEffect } from 'react';
import { searchPlaces, saveHistory } from '../services/api';
import useGeolocation from '../hooks/useGeolocation';
import PlaceCard from '../components/PlaceCard/PlaceCard';
import ChatBot from '../components/ChatBot/ChatBot';
import MapView from '../components/MapView/MapView';
import PlaceModal from '../components/PlaceModal/PlaceModal';
import { FaSearch, FaSpinner, FaLocationArrow } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import PlaceSkeleton from '../components/Skeleton/PlaceSkeleton';

const Explore = () => {
  const [city, setCity] = useState('');
  const [searchedCity, setSearchedCity] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { location } = useGeolocation();

  const popularCities = ['Delhi', 'Jaipur', 'Mumbai', 'Agra', 'Varanasi', 'Goa' , 'Patna'];

  const handleSearch = async (cityName) => {
    const searchCity = cityName || city;
    if (!searchCity.trim()) return;

    setLoading(true);
    setError('');
    setPlaces([]);
    setSearched(false);
    setShowMap(false);

    try {
      const res = await searchPlaces(
        searchCity,
        location.lat || 0,
        location.lng || 0
      );
      setPlaces(res.data.places);
      setSearchedCity(searchCity);
      setSearched(true);
    } catch (err) {
      setError('Failed to fetch places. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const [searchParams] = useSearchParams();

useEffect(() => {
  const cityFromUrl = searchParams.get('city');
  if (cityFromUrl) {
    setCity(cityFromUrl);
    handleSearch(cityFromUrl);
  }
}, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-blue-500 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-3">
            Explore India 🗺️
          </h1>
          <p className="text-purple-100 text-lg mb-4">
            Discover amazing places sorted by your distance
          </p>

          {/* Location Badge */}
          <div className="flex justify-center mb-8">
            <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
              location.lat ? 'bg-green-500 text-white' : 'bg-white/20 text-white'
            }`}>
              <FaLocationArrow />
              {location.lat ? 'Live location detected ✓' : 'Detecting location...'}
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search city... (Delhi, Jaipur, Mumbai)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-5 py-4 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-xl text-lg"
            />
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-4 rounded-2xl transition shadow-xl flex items-center gap-2 text-lg"
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaSearch />}
            </button>
          </div>

          {/* Popular Cities */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {popularCities.map((c) => (
              <button
                key={c}
                onClick={() => { setCity(c); handleSearch(c); }}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* normal Loading animatoin */}
        {/*
        {loading && (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <FaSpinner className="text-purple-600 text-5xl animate-spin" />
            <p className="text-purple-600 text-xl font-medium">
              Finding best places in {city}...
            </p>
          </div>
        )} */}

        {/* Loading Skeleton */}
        {loading && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 bg-gray-200 rounded-full w-40 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <PlaceSkeleton key={i} />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-10">
            <p className="text-6xl mb-4">😕</p>
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {/* No Results */}
        {searched && !loading && places.length === 0 && !error && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-gray-500 text-xl">No places found for {searchedCity}</p>
          </div>
        )}

        {/* Results Header */}
        {places.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                📍 {searchedCity}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {places.length} places — sorted by distance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMap(!showMap)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                  showMap
                    ? 'bg-purple-600 text-white'
                    : 'border border-purple-600 text-purple-600 hover:bg-purple-50'
                }`}
              >
                🗺️ {showMap ? 'Hide Map' : 'Show Map'}
              </button>
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                {places.length} Places
              </span>
            </div>
          </div>
        )}

        {/* Map View */}
        {showMap && places.length > 0 && (
          <div className="mb-8">
            <MapView
              places={places}
              cityCoords={places[0]?.coordinates}
              userLocation={location}
              onPlaceClick={(place) => setSelectedPlace(place)}
            />
          </div>
        )}

        {/* Places Grid */}
        {places.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <PlaceCard key={place.placeId} place={place} city={searchedCity} />
            ))}
          </div>
        )}

        {/* Default State */}
        {!searched && !loading && (
          <div className="text-center py-20">
            <p className="text-8xl mb-6">🌍</p>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Where do you want to explore?
            </h2>
            <p className="text-gray-400 text-lg">
              Search a city or pick from popular destinations above
            </p>
          </div>
        )}
      </div>

      {/* Map se selected place ka modal */}
      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          city={searchedCity}
          onClose={() => setSelectedPlace(null)}
          onSave={async (placeData, aiTip) => {
            try {
              await saveHistory({
                placeName: placeData.name,
                placeId: placeData.placeId,
                city: searchedCity,
                coordinates: placeData.coordinates,
                aiTip: aiTip?.tip || ''
              });
            } catch (e) {
              console.log(e);
            }
            setSelectedPlace(null);
          }}
          saved={false}
        />
      )}

      {/* ChatBot */}
      <ChatBot city={searchedCity} />
    </div>
  );
};

export default Explore;