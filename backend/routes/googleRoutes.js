const express = require("express");
const passport = require("passport");
const googleRouter = express.Router();
require("../config/googleStrategy");

googleRouter.get("/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

googleRouter.get("/verify",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/user/login",
  }),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = googleRouter;
