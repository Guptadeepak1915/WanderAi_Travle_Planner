import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-blue-500 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-9xl font-bold text-white/20 mb-4">404</p>
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md mx-auto -mt-10 relative">
          <p className="text-6xl mb-4">🗺️</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Page Not Found!
          </h1>
          <p className="text-gray-500 mb-6">
            Looks like you got lost on your journey. Let us take you back!
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="bg-purple-600 text-white py-3 rounded-2xl font-bold hover:bg-purple-700 transition"
            >
              🏠 Go Home
            </Link>
            <Link
              to="/explore"
              className="border border-purple-600 text-purple-600 py-3 rounded-2xl font-bold hover:bg-purple-50 transition"
            >
              🗺️ Start Exploring
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;