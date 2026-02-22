const express = require('express');
const router = express.Router();
const { searchPlaces, getPlaceDetails } = require('../controllers/placesController');
const protect = require('../middleware/authMiddleware');

router.get('/search', protect, searchPlaces);
router.get('/details/:placeId', protect, getPlaceDetails);

module.exports = router;