const {Comment} = require('../models');

const commentSeeds = [
  {
    content: "I love using React, it's so cool the way it constantly updates based on your backend JS files!",
    user_id: 2,
    post_id: 1
  },
  {
    content: "Try using Browserify! Browserify allows you to create a front end JS file that has access to your node modules.",
    user_id: 2,
    post_id: 2
  },
  {
    content: "I agree Browserify is super easy to use and you can import what ever node modules you need.",
    user_id: 4,
    post_id: 2
  },
  {
    content: "Congratulations!",
    user_id: 5,
    post_id: 3
  },
  {
    content: 'Congrats!!',
    user_id: 3,
    post_id: 3
  },
  {
    content: 'HTTPS is basically an encrypted version of HTTP. HTTP stands for Hypertext Transfer Protocol. This protocol includes the CRUD methods of GET, POST, PUT, and DELETE (along with some others), and defines the way the request-response cycle works. Hope that helps!',
    user_id: 1,
    post_id: 4
  },
  {
    content: "I've used Foundation before but their XY Grid was a bit difficult to wrap my head around. It seems like it's a powerful framework with a bit of a learning curve.",
    user_id: 2,
    post_id: 5
  }
]

async function seedComments() {
  const response = await Comment.bulkCreate(commentSeeds);
  return response;
}

module.exports = seedComments;