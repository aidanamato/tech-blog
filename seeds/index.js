const sequelize = require('../config/connection');

const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

async function seedAll() {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedPosts();
  await seedComments();

  process.exit(0);
};

seedAll();