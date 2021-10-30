const {Post} = require('../models');

const postSeeds = [
  {
    title: "Soon I'll know the entire MERN stack!",
    content: "I'm finally learning React which is the last technology I need to learn in the MERN stack! Did you know React uses the DOM to constantly update content behind the scenes? It's so much more efficient compared to using a front in JS file to manually dynamically create and update HTML. I almost wish I had known about it sooner, but React is complicated so I see why I needed to learn it last. I can't wait to make a bunch of React apps after this!",
    user_id: 1
  },
  {
    title: 'Node modules in the front end?',
    content: "I tried requiring Node modules in my front end JS files but something isn't working right, is there a way I can use my handy 3rd party libraries in the front end?",
    user_id: 3
  },
  {
    title: 'Starting new position as junior web developer!',
    content: "I recently graduated from the UCF coding bootcamp and I just accepted my first position in the field!",
    user_id: 2
  },
  {
    title: 'HTTP or HTTPS?',
    content: 'Does anyone know the difference between HTTP and HTTPS? What does HTTP actually mean? Thanks for the help!',
    user_id: 5
  },
  {
    title: 'Favorite CSS Frameworks',
    content: "What are some of your favorite CSS frameworks? I've used Bootstrap in the past and I like it for it's intuitive grid layout system and it's handy features such as it's built in card layouts.",
    user_id: 4
  }
]

async function seedPosts() {
  const response = await Post.bulkCreate(postSeeds);
  return response;
}

module.exports = seedPosts;