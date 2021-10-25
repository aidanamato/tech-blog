const router = require('express').Router();
const {Post, User} = require('../../models');
const withAuth = require('../../utils/auth');

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

module.exports = router;