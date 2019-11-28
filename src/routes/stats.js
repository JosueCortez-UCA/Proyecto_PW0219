const express = require('express');
const router = express.Router();

// Models
const Reserv = require('../models/Reserv');
const User = require('../models/User');

router.get('/stats', async (req, res) => {
  Reserv.find({}, function(err, reservas) {
    User.populate(reservas, {path: "user"},function(err, reservas){
        res.render('stats/all-stats', { reservas });
      }); 
  });
});

module.exports = router;
