const router = require('express').Router();
const { User, Favorite } = require('../../models');

//create route to save favorite
router.post('/movies', async (req, res) => {
  console.log(req.session);
  try {
    const favoriteData = await Favorite.create({
      movie_title: req.body.movieTitle,
      movie_id: req.body.movieId,
      movie_poster: req.body.posterPath,
      user_id: req.session.loggedInUser
    });
    console.log(favoriteData.toJSON());
    res.status(200).json(favoriteData.toJSON());
  } catch (err) {
    res.status(400).json(err);
  }
})

router.delete("/movies", async (req, res) => {
  if (!req.session.loggedIn) {
    return;
  }
  try {
    await Favorite.destroy({where: {id: req.body.favoriteId}})
    res.status(200).json({message: "Deleted!"});
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.loggedInUser = dbUserData.id;
      req.session.username = dbUserData.username;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// added this.... 
router.put('/addmovie', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const dbUserData = await User.update({
        movies: req.body
      },
        {
          where: {
            id: req.session.loggedInUser
          }
        })

    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})


// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      // req.session.user_id = dbUserData.id;
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
