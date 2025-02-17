const express = require("express");
const loginRouter = express.Router();
const googleRouter = require("./googleRoutes");
const logUser = require("../controllers/login/logUser");
const logOut = require("../controllers/login/logOut");
const generateOTP = require("../controllers/login/generateOTP");
const logNewUser = require("../controllers/login/logNewUser");

loginRouter.post("/", logUser);
loginRouter.post("/newuser", logNewUser);

loginRouter.get("/otp", generateOTP);
loginRouter.use("/google", googleRouter);
loginRouter.delete("/remove", logOut);

module.exports = loginRouter;
