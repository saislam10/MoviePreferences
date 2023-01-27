const router = require("express").Router();
const { Favorite } = require("../models");
const axios = require("axios").default;
require('dotenv').config();


// API fetch request
router.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`
    );
    const movies = data.results.slice(0, 12);

    res.render("homepage", {
      data: movies,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//send to different page
router.get("/search-results", async (req, res) => {
  try {
    const {title} = req.query;

    if (!title) {
      return res.status(404).render('not-found');
    }

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${title}&page=1`
    );
    const movies = data.results.slice(0, 8);
   

    res.render("search-results", {
      movies,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//this needs work in order to leverage user_id
router.get("/favorite", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  try {
    const data = await Favorite.findAll({where: {user_id: req.session.loggedInUser}})
    
    //find user id here in order to get favorites for each user
    const favorites = data.map(favorite => favorite.get({plain:true}))
    console.log(favorites)
    res.render("liked-movies", {
      data: favorites,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});


router.get("/reviews", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("reviews", {
    loggedIn: req.session.loggedIn
  });
});

module.exports = router;
