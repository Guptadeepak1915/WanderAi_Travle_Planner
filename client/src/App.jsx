// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import Navbar from './components/Navbar/Navbar';
// import Auth from './pages/Auth';
// import Explore from './pages/Explore';
// import History from './pages/History';
// import Itinerary from './pages/Itinerary';
// // Protected Route
// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   if (loading) return <div className="flex justify-center items-center min-h-screen text-purple-600 text-xl">Loading...</div>;
//   return user ? children : <Navigate to="/login" />;
// };

// const AppRoutes = () => {
//   const { user } = useAuth();
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/login" element={user ? <Navigate to="/explore" /> : <Auth />} />
//         <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
//         <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
//         <Route path="*" element={<Navigate to="/explore" />} />
//         <Route path="/itinerary" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
//       </Routes>
//     </>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <AppRoutes />
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Explore from './pages/Explore';
import History from './pages/History';
import Itinerary from './pages/Itinerary';
import NotFound from './pages/NotFound';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-purple-600 text-xl">Loading...</div>
    </div>
  );
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/explore" /> : <Auth />} />
        <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/itinerary" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;