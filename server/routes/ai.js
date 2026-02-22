const express = require('express');
const router = express.Router();
const { getPlaceTips, getItinerary, chatWithAI } = require('../controllers/aiController');
const protect = require('../middleware/authMiddleware');

router.post('/tips', protect, getPlaceTips);
router.post('/itinerary', protect, getItinerary);
router.post('/chat', protect, chatWithAI);

module.exports = router;