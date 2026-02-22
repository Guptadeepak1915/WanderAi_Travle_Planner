const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/Db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Health check
app.get('/', (req, res) => {
  res.send('WanderAI API is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🌍`));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/places', require('./routes/places')); // add this line

app.use('/api/auth', require('./routes/auth'));
app.use('/api/places', require('./routes/places'));
app.use('/api/history', require('./routes/history'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/places', require('./routes/places'));
app.use('/api/history', require('./routes/history'));
app.use('/api/ai', require('./routes/ai')); // ← ye add karo
