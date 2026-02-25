# 🌍 WanderAI — AI-Powered Travel Companion

<div align="center">
**Discover. Explore. Travel Smarter with AI.**

*An intelligent travel companion that finds the best tourist places near you, sorted by distance — powered by real data and AI.*

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📍 **Live Location Detection** | GPS-based real-time location tracking |
| 🗺️ **Smart Places Search** | Find tourist attractions in any city worldwide |
| 📏 **Distance Sorting** | Places sorted by nearest first using Haversine Formula |
| 🤖 **AI Travel Tips** | Get personalized tips for every place via AI |
| 🗓️ **AI Trip Planner** | Generate full day itinerary with timeline |
| 💬 **AI Chatbot** | Ask any travel question — get instant answers |
| 🗺️ **Interactive Map** | Leaflet.js powered map with place markers |
| 📚 **Travel History** | Save and revisit your explored places city-wise |
| 📸 **Real Photos** | Wikipedia-powered authentic place images |
| 📱 **Mobile Responsive** | Works perfectly on all screen sizes |

---

## 🚀 Live Demo

🌐 **Website:** [https://wanderai-travle-planner.vercel.app](https://wanderai-travle-planner.vercel.app)

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet.js-199900?style=flat&logo=leaflet&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=JSON%20web%20tokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-003A70?style=flat)

### APIs & Services
| Service | Purpose | Cost |
|---------|---------|------|
| [Geoapify](https://geoapify.com) | Tourist places data | Free |
| [OpenStreetMap Nominatim](https://nominatim.org) | City coordinates | Free |
| [Wikipedia REST API](https://en.wikipedia.org/api) | Place images | Free |
| [OpenRouter + Gemma](https://openrouter.ai) | AI features | Free |
| [Leaflet.js](https://leafletjs.com) | Interactive maps | Free |

---

## 📁 Project Structure

```
wanderai/
├── server/                         # Backend — Node.js + Express
│   ├── config/
│   │   └── Db.js                   # MongoDB connection
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   └── History.js              # Travel history schema
│   ├── controllers/
│   │   ├── authController.js       # Register / Login logic
│   │   ├── placesController.js     # Places search + distance sort
│   │   ├── historyController.js    # Save / Get / Delete history
│   │   └── aiController.js         # AI tips / itinerary / chat
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT token verification
│   ├── routes/
│   │   ├── auth.js                 # /api/auth routes
│   │   ├── places.js               # /api/places routes
│   │   ├── history.js              # /api/history routes
│   │   └── ai.js                   # /api/ai routes
│   ├── .env                        # Environment variables
│   └── server.js                   # Express server entry point
│
└── client/                         # Frontend — React + Vite
    └── src/
        ├── context/
        │   └── AuthContext.jsx     # Global auth state
        ├── hooks/
        │   └── useGeolocation.js   # Live GPS location hook
        ├── services/
        │   └── api.js              # All API calls (Axios)
        ├── components/
        │   ├── Navbar/             # Responsive navigation
        │   ├── PlaceCard/          # Tourist place card
        │   ├── PlaceModal/         # Place detail popup
        │   ├── MapView/            # Leaflet.js map
        │   ├── ChatBot/            # AI chat widget
        │   └── Skeleton/           # Loading skeleton
        └── pages/
            ├── Home.jsx            # Landing page
            ├── Auth.jsx            # Login / Register
            ├── Explore.jsx         # Search + Map + Grid
            ├── History.jsx         # Saved places
            ├── Itinerary.jsx       # AI trip planner
            └── NotFound.jsx        # 404 page
```

---

## ⚙️ How It Works

```
User searches city (e.g., "Delhi")
           ↓
OpenStreetMap fetches city coordinates
           ↓
Geoapify finds 30 tourist places in 10km radius
           ↓
Wikipedia API fetches real photos for each place
           ↓
Haversine Formula calculates distance from user's GPS
           ↓
Places sorted by distance — nearest first
           ↓
User clicks place → AI generates travel tips
           ↓
Place saved to MongoDB history
```

---


## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- API Keys: Geoapify, OpenRouter

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Guptadeepak1915/WanderAi_Travle_Planner.git
cd WanderAi_Travle_Planner
```

**2. Setup Backend**
```bash
cd server
npm install
```

Create `.env` file in `server/`:
```env
PORT=1234
MONGO_URI=mongodb://localhost:27017/wanderai
JWT_SECRET=your_jwt_secret_here
GEOAPIFY_API_KEY=your_geoapify_key_here
OPENROUTER_API_KEY=your_openrouter_key_here
```

```bash
npm run dev
```

**3. Setup Frontend**
```bash
cd ../client
npm install
npm run dev
```

**4. Open in browser**
```
http://localhost:5173
```

---

## 🌐 Deployment

| Platform | Service | URL |
|----------|---------|-----|
| Vercel | Frontend | [wanderai-travle-planner.vercel.app](https://wanderai-travle-planner.vercel.app) |
| Render | Backend |  |
| MongoDB Atlas | Database | Cloud Hosted |

---

## 📸 Screenshots

### 🏠 Home Page
> Beautiful landing page with animated hero section and popular cities

### 🔍 Explore Page  
> Search any city — get real tourist places sorted by distance

### 🗺️ Map View
> Interactive Leaflet.js map with place markers

### 🤖 AI Features
> Personalized travel tips, full day itinerary, and travel chatbot

---

## 🧠 Key Concepts Used

- **JWT Authentication** — Secure stateless auth with 7-day tokens
- **Haversine Formula** — Accurate Earth-surface distance calculation
- **Promise.all()** — Parallel API calls for faster image fetching
- **React Context API** — Global state management without Redux
- **Axios Interceptors** — Auto-attach JWT token to every request
- **Optional Chaining (?.)** — Safe nested property access
- **MongoDB References** — userId linking History to User model

---

## 👨‍💻 Developer

**Deepak Gupta**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/Guptadeepak1915)

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Made by Deepak Gupta**

*If you found this project helpful, please ⭐ star the repository!*

</div>