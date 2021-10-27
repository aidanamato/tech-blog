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
    username: 'elonmuskreal',
    password: 'Lzu?BJv=an6S'
  },
  {
    username: 'httpwarrior',
    password: '?SH%8#f*e?fA'
  }
]

function seedUsers() {
  User.bulkCreate(userSeeds, {individualHooks: true});
}

module.exports = seedUsers;