import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Har request mein token automatically add hoga
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth APIs
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Places APIs
export const searchPlaces = (city, lat, lng) =>
  API.get(`/places/search?city=${city}&lat=${lat}&lng=${lng}`);
export const getPlaceDetails = (placeId) =>
  API.get(`/places/details/${placeId}`);

// History APIs
export const saveHistory = (data) => API.post('/history/save', data);
export const getHistory = () => API.get('/history');
export const deleteHistory = (id) => API.delete(`/history/${id}`);

// AI APIs
export const getAITips = (data) => API.post('/ai/tips', data);
export const getItinerary = (data) => API.post('/ai/itinerary', data);
export const chatWithAI = (data) => API.post('/ai/chat', data);