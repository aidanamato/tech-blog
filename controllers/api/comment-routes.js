const router = require('express').Router();
const {Post, User, Comment} = require('../../models');

// get all comments
router.get('/', (req, res) => {
  Comment.findAll({
    attributes: {
      exclude: ['user_id', 'post_id']
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password']
        }
      },
      {
        model: Post,
        attributes: {
          exclude: ['user_id']
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password']
            }
          }
        ]
      }
    ]
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get comments by post id
router.get('/:postId', (req, res) => {
  Comment.findAll({
    order: [['created_at', 'DESC']],
    where: {
      post_id: req.params.postId
    },
    attributes: ['content', 'user_id', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({message: 'No post found with this id'});
        return;
      }
      
      const comments = dbCommentData.map(comment => comment.get({plain: true}));
      res.json({comments});
    })
    .catch(err => {
      console.log(err);
      res.status()
    })
});

router.post('/', (req, res) => {
  Comment.create(
    {
    content: req.body.content,
    user_id: req.session.user_id,
    post_id: req.body.post_id
    }
  )
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;