import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {FaMapMarkerAlt,FaHistory,FaSignOutAlt,FaCompass,FaRoute,FaBars,FaTimes} from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-purple-600 text-2xl" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            WanderAI
          </span>
        </Link>

        {/* Desktop Nav */}
        {user && (
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/explore"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium transition ${
                isActive('/explore')
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              <FaCompass /> Explore
            </Link>
            <Link
              to="/itinerary"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium transition ${
                isActive('/itinerary')
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              <FaRoute /> Plan Trip
            </Link>
            <Link
              to="/history"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium transition ${
                isActive('/history')
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`}
            >
              <FaHistory /> History
            </Link>

            {/* User Avatar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl ml-2">
              <div className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 font-medium text-sm">{user.name}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition font-medium"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}

        {/* Mobile Hamburger */}
        {user && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-600 text-xl p-2"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {user && menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-2">
          <Link
            to="/explore"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium"
          >
            <FaCompass /> Explore
          </Link>
          <Link
            to="/itinerary"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium"
          >
            <FaRoute /> Plan Trip
          </Link>
          <Link
            to="/history"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium"
          >
            <FaHistory /> History
          </Link>
          <div className="border-t border-gray-100 pt-2">
            <div className="flex items-center gap-2 px-4 py-2 text-gray-600">
              <div className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;