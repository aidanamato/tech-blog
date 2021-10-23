const User = require('./User');
const Post = require('./Post');

// associations
//user-post one to many
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = {User, Post};