const router = require('express').Router();
const {Post, User, Comment} = require('../../models');

// homepage
router.get('/', (req, res) => {
  Post.findAll({
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
          attributes: ['username', 'id']
        }
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => {
        post = post.get({plain: true});
        
        let isUserPost;
        post.user_id === req.session.user_id ? isUserPost = true : isUserPost = false;
        post.is_user_post = isUserPost;

        return post;
      });

      console.log(posts);
      
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

// user page
router.get('/user/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
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
              attributes: ['username', 'id']
            }
          }
        ]
      }
    ]
  })
    .then(dbUserData => {
      console.log(dbUserData.posts);
      
      const posts = dbUserData.posts.map(post => {
        post = post.get({plain: true});
        
        let isUserPost;
        post.user_id === req.session.user_id ? isUserPost = true : isUserPost = false;
        post.is_user_post = isUserPost;

        return post;
      });
      
      if (dbUserData.id === req.session.user_id) {
        res.redirect('/dashboard');
        return;
      }
      
      res.render('profile', {
        posts,
        username: dbUserData.username,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;