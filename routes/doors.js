const express = require('express');
const router  = express.Router();

const checkRole = (role) => (req,res,next) => req.user && req.user.role === role ? next() : res.render("index", {msg: `Tienes que ser un ${role} para entrar aquí`})

router.get('/fan', checkRole("Fan"), (req, res, next) => {
  res.render('doors/fan');
});

router.get('/backliner',checkRole("Backliner"), (req, res, next) => {
  res.render('doors/backliner');
});

router.get('/artist', checkRole("Artist"), (req, res, next) => {
  res.render('doors/artist');
});

router.get('/popino', (req, res, next) => {
  res.render("index");
});

module.exports = router;
