const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/Db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://wander-ai-travle-planner.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('WanderAI API is running 🚀');
});

// Routes — sirf ek baar
app.use('/api/auth', require('./routes/auth'));
app.use('/api/places', require('./routes/places'));
app.use('/api/history', require('./routes/history'));
app.use('/api/ai', require('./routes/ai'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} 🌍`);
});