const express = require("express");
const loginRouter = express.Router();
const googleRouter = require("./googleRoutes");
const logUser = require("../controllers/login/logUser");

loginRouter.post("/", logUser);

loginRouter.use("/google", googleRouter);

module.exports = loginRouter;
