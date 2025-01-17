const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");
const Movie = require("../models/Movie");

/* GET home page */
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/celebrities/", async (req, res, next) => {
  try {
    theCelebs = await Celebrity.find();
    res.render("allcelebrities", { theCelebs });
  } catch (err) {
    next(err);
  }
});

router.get("/celebrities/new", (req, res) => {
  res.render("new");
});

router.get("/celebrities/:theID/edit", async (req, res, next) => {
  try {
    theCeleb = await Celebrity.findById(req.params.theID);
    res.render("edit", { theCeleb });
  } catch (err) {
    next(err);
  }
});

router.post("/celebrities/:id/edit", async (req, res, next) => {
  try {
    await Celebrity.findByIdAndUpdate(
      req.body.id,
      { ...req.body },
      { new: true }
    );
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
  }
});

router.get("/celebrities/:theID", async (req, res, next) => {
  try {
    theCeleb = await Celebrity.findById(req.params.theID);
    res.render("show", { theCeleb });
  } catch (err) {
    next(err);
  }
});

router.post("/celebrities", async (req, res, next) => {
  try {
    await Celebrity.create({ ...req.body });
    res.redirect("/celebrities");
  } catch (err) {
    res.redirect("/celebrities/new");
    next(err);
  }
});

router.post("/celebrities/:theID/delete", async (req, res, next) => {
  try {
    await Celebrity.findByIdAndRemove(req.params.theID);
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
  }
});

// ---------------- Movies ------------------

router.get("/movies", async (req, res, next) => {
  try {
    theMovies = await Movie.find();
    res.render("movies", { theMovies });
  } catch (err) {
    next(err);
  }
});

router.get("/movies/new", (req, res) => {
  res.render("newMovie");
});

router.get("/movies/:theID", async (req, res, next) => {
  try {
    theMovie = await Movie.findById(req.params.theID);
    res.render("showMovie", { theMovie });
  } catch (err) {
    next(err);
  }
});

router.post("/movies", async (req, res, next) => {
  try {
    await Movie.create({ ...req.body });
    res.redirect("/movies");
  } catch (err) {
    res.redirect("/movies/new");
    next(err);
  }
});

router.post("/movies/:theID/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndRemove(req.params.theID);
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

router.get("/movies/:theID/edit", async (req, res, next) => {
  try {
    theMovie = await Movie.findById(req.params.theID);
    res.render("editMovie", { theMovie });
  } catch (err) {
    next(err);
  }
});

router.post("/movies/:id/edit", async (req, res, next) => {
  try {
    await Movie.findByIdAndUpdate(req.body.id, { ...req.body }, { new: true });
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
