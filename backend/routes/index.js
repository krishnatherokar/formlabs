const express = require("express");
const userRouter = require("./userRoutes");
const formRouter = require("./formRoutes");
const loginRouter = require("./loginRoutes");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Working");
});

router.use("/login", loginRouter);
router.use("/user", userRouter);
router.use("/form", formRouter);

module.exports = router;
