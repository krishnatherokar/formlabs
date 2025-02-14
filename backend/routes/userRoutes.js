const express = require("express");
const isLogged = require("../middlewares/isLogged");
const editProfile = require("../controllers/profile/editProfile");
const userRouter = express.Router();

userRouter.use(isLogged);

userRouter.get("/", (req, res) => {
  res.json(req.user);
});

userRouter.post("/edit", editProfile);

module.exports = userRouter;
