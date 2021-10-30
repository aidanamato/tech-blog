const {User} = require('../models');

const userSeeds = [
  {
    username: 'merntastic',
    password: '8^<v8PQ@nZHM'
  },
  {
    username: 'aidan',
    password: 'm+,S9[SCzw8Y'
  },
  {
    username: 'nodenugget',
    password: '3{*sBp7uLh3E'
  },
  {
    username: 'realslimshady',
    password: 'Lzu?BJv=an6S'
  },
  {
    username: 'webwarrior',
    password: '?SH%8#f*e?fA'
  }
]

async function seedUsers() {
  const response = await User.bulkCreate(userSeeds, {individualHooks: true});
  return response;
}

module.exports = seedUsers;

