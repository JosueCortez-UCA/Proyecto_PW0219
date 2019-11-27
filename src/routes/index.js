const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/profile', (req, res) => {
  res.render('profile');
});

module.exports = router;
