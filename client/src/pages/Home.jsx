import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaRobot, FaHistory, FaRoute, FaLocationArrow, FaStar } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaLocationArrow className="text-3xl text-purple-600" />,
      title: 'Live Location Tracking',
      desc: 'Places sorted by your real-time distance — nearest first!'
    },
    {
      icon: <FaRobot className="text-3xl text-purple-600" />,
      title: 'AI Travel Assistant',
      desc: 'Get smart tips, local food suggestions and travel warnings for every place.'
    },
    {
      icon: <FaRoute className="text-3xl text-purple-600" />,
      title: 'AI Trip Planner',
      desc: 'Generate a complete day itinerary based on your interests and time.'
    },
    {
      icon: <FaHistory className="text-3xl text-purple-600" />,
      title: 'Travel History',
      desc: 'Every place you explore gets saved — city wise, with AI tips.'
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl text-purple-600" />,
      title: 'Interactive Map',
      desc: 'See all places on a live map — click any marker for details.'
    },
    {
      icon: <FaStar className="text-3xl text-purple-600" />,
      title: 'Real Data',
      desc: 'Powered by real tourist data with Wikipedia photos and ratings.'
    }
  ];

  const cities = [
    { name: 'Delhi', emoji: '🏛️' },
    { name: 'Jaipur', emoji: '🏰' },
    { name: 'Mumbai', emoji: '🌊' },
    { name: 'Agra', emoji: '🕌' },
    { name: 'Varanasi', emoji: '🪔' },
    { name: 'Goa', emoji: '🏖️' },
    { name: 'Chennai', emoji: '🌴' },
    { name: 'Kolkata', emoji: '🌉' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-blue-500 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

        {/* Background circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaMapMarkerAlt className="text-yellow-400 text-5xl" />
            <h1 className="text-6xl font-bold text-white">WanderAI</h1>
          </div>

          <p className="text-2xl text-purple-100 mb-4 font-medium">
            Your AI-Powered Travel Companion 🗺️
          </p>
          <p className="text-purple-200 text-lg mb-10 max-w-2xl mx-auto">
            Discover amazing places around you, get AI travel tips, plan your perfect day trip — all in one app!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/explore"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-2xl text-lg transition shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              🗺️ Start Exploring
            </Link>
            <Link
              to="/itinerary"
              className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-2xl text-lg transition border border-white/30 hover:-translate-y-1"
            >
              🤖 Plan a Trip
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: '1000+', label: 'Places' },
              { value: 'AI', label: 'Powered' },
              { value: 'Free', label: 'Forever' }
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-2xl p-4">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-purple-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Everything You Need to Travel Smart
            </h2>
            <p className="text-gray-500 text-lg">
              WanderAI makes solo travel easy and fun
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Cities */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Popular Destinations
          </h2>
          <p className="text-gray-500 mb-10">
            Start exploring these amazing Indian cities
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cities.map((city) => (
              <Link
                key={city.name}
                to={`/explore?city=${city.name}`}
                className="bg-gray-50 hover:bg-purple-50 border border-gray-100 hover:border-purple-200 rounded-2xl p-5 text-center transition hover:-translate-y-1 group"
              >
                <p className="text-4xl mb-2">{city.emoji}</p>
                <p className="font-bold text-gray-800 group-hover:text-purple-600 transition">
                  {city.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-purple-700 to-blue-500">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Explore? 🚀
          </h2>
          <p className="text-purple-100 text-lg mb-8">
            Join thousands of solo travelers using WanderAI
          </p>
          <Link
            to="/explore"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-10 py-4 rounded-2xl text-xl transition shadow-xl inline-block hover:-translate-y-1"
          >
            Get Started Free →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <FaMapMarkerAlt className="text-purple-500" />
          <span className="text-white font-bold">WanderAI</span>
        </div>
        <p className="text-sm">Made By Deepak Gupta | solo travelers and All Others</p>
      </footer>
    </div>
  );
};

export default Home;