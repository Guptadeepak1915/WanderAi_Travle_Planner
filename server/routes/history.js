const express = require('express');
const router = express.Router();
const { saveHistory, getHistory, deleteHistory } = require('../controllers/historyController');
const protect = require('../middleware/authMiddleware');

router.post('/save', protect, saveHistory);
router.get('/', protect, getHistory);
router.delete('/:id', protect, deleteHistory);

module.exports = router;