const express = require('express');
const router = express.Router();

// Models
const Reserv = require('../models/Reserv');

// Get de todas las solicitudes
router.get('/stats', async (req, res) => {
  const reserv = await Reserv.find();
  res.render('stats/all-stats', { reserv });
});

module.exports = router;
