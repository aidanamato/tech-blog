const sequelize = require('../config/connection');

const seedUsers = require('./user-seeds');

async function seedAll() {
  await sequelize.sync({ force: true });

  console.log('seed users');
  await seedUsers();

  process.exit(0);
};

seedAll();