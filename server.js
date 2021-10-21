const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
require('dotenv').config();
const createDb = require('./utils/createDb');

const app = express();
const hbs = exphbs.create();
const PORT = process.env.PORT || 3001;

// creates the database on launch if not exists
createDb();

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({force: true}).then(() => {
  app.listen(PORT, console.log(`Now listening on port ${PORT}`))
});