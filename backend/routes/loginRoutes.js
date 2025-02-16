const express = require("express");
const loginRouter = express.Router();
const googleRouter = require("./googleRoutes");
const logUser = require("../controllers/login/logUser");
const logOut = require("../controllers/login/logOut");

loginRouter.post("/", logUser);

loginRouter.use("/google", googleRouter);

loginRouter.get("/remove", logOut);

module.exports = loginRouter;
