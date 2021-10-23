const router = require('express').Router();
const {Post, User} = require('../models');
const withAuth = require('../utils/auth');

// homepage
router.get('/', (req, res) => {
  Post.findAll({
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username', 'id']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({plain: true}));
      
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login/signup
router.get('/login', (req, res) => {
  res.render('login-signup', {login: true});
});

router.get('/signup', (req, res) => {
  res.render('login-signup', {signup: true});
});

// dashboard
router.get('/dashboard', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username', 'id']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({plain: true}));
      
      res.render('dashboard', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/dashboard/new', withAuth, (req, res) => {
  res.render('dashboard', {
    newPost: true,
    loggedIn: req.session.loggedIn
  });
});

// user page
router.get('/user/:id', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.params.id
    },
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username', 'id']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({plain: true}));
      
      res.render('profile', {
        posts,
        username: req.session.username,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;