const express = require("express");
const isLogged = require("../middlewares/isLogged");
const editProfile = require("../controllers/profile/editProfile");
const showForms = require("../controllers/profile/showForms");
const showUserResponses = require("../controllers/profile/showUserResponses");
const deleteProfile = require("../controllers/profile/deleteProfile");
const userRouter = express.Router();

userRouter.use(isLogged);

userRouter.get("/", (req, res) => {
  res.json(req.user);
});

userRouter.get("/sf", showForms);
userRouter.get("/sr", showUserResponses);
userRouter.post("/edit", editProfile);
userRouter.delete("/delete", deleteProfile);

module.exports = userRouter;
