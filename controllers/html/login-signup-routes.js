const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login-signup', {login: true});
});

router.get('/signup', (req, res) => {
  res.render('login-signup', {signup: true});
});

module.exports = router;