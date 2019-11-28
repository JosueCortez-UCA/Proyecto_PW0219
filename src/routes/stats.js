const express = require('express');
const router = express.Router();

// Models
const Lab = require('../models/Labs');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// Get de todas las solicitudes
router.get('/stats', isAuthenticated, async (req, res) => {
  const labs = await Lab.find();
  res.render('stats/all-stats', { labs });
});

module.exports = router;
