const {Post} = require('../models');

const postSeeds = [
  
]

function seedPosts() {
  Post.bulkCreate(postSeeds);
}

module.exports = seedPosts;