const express = require("express");
const passport = require("passport");
const logGoogle = require("../controllers/login/logGoogle");
const googleRouter = express.Router();
require("../config/googleStrategy");

googleRouter.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

googleRouter.get(
  "/verify",
  passport.authenticate("google", {
    session: false,
    failureRedirect: process.env.G_FAIL_REDIRECT,
  }),
  logGoogle
);

module.exports = googleRouter;
