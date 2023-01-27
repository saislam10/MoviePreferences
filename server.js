const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const axios = require('axios');



const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers }); 

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// const testRequest = async () => {

//   const result = await axios.get('https://api.themoviedb.org/3/movie/550?api_key=9e1589a2fc403d6de0df005fb8a3d78a')
//   console.log(result.data)

// }
// testRequest();
// get trending movies for the week  https://api.themoviedb.org/3/trending/movie/week?api_key=9e1589a2fc403d6de0df005fb8a3d78a
// search by keyword https://api.themoviedb.org/3/search/keyword?api_key=9e1589a2fc403d6de0df005fb8a3d78a&query=action&page=1
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

