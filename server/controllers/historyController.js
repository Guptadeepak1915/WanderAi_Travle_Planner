const History = require('../models/History');

// @POST /api/history/save
const saveHistory = async (req, res) => {
  const { placeName, placeId, city, coordinates, aiTip } = req.body;

  try {
    const entry = await History.create({
      userId: req.user.id,
      placeName,
      placeId,
      city,
      coordinates,
      aiTip
    });

    res.status(201).json({ message: 'Place saved to history', entry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @GET /api/history
const getHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id }).sort({
      visitedAt: -1
    });

    res.status(200).json({ totalEntries: history.length, history });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @DELETE /api/history/:id
const deleteHistory = async (req, res) => {
  try {
    await History.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { saveHistory, getHistory, deleteHistory };