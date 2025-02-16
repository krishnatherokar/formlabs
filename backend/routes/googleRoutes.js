const express = require("express");
const passport = require("passport");
const logGoogle = require("../controllers/login/logGoogle");
const getRedirectUrl = require("../utils/getRedirectUrl");
const googleRouter = express.Router();
require("../config/googleStrategy");

googleRouter.get(
  "/",
  // check if the url contains the query redirectTo
  getRedirectUrl,
  // authenticate with google using passport
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

googleRouter.get(
  "/verify",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_BASE}/#/user`,
  }),
  logGoogle
);

module.exports = googleRouter;
