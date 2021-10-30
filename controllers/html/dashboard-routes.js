const router = require('express').Router();
const {Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts of logged in user
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
      },
      {
        model: Comment,
        attributes: ['content'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({plain: true}));
      
      res.render('dashboard', {
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

router.get('/dashboard/new', withAuth, (req, res) => {
  res.render('dashboard', {
    newPost: true,
    loggedIn: req.session.loggedIn
  });
});

module.exports = router;