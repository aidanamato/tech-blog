const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/login', (req, res) => {
  res.render('login-signup', {login: true});
});

router.get('/signup', (req, res) => {
  res.render('login-signup', {signup: true});
});


module.exports = router;