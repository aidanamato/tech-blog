const sequelize = require('../config/connection');

const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

async function seedAll() {
  sequelize.sync({ force: false })
    .then(() => seedComments());
};

seedAll();