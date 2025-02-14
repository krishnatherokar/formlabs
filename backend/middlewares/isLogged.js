const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const isLogged = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new backendError("Unauthorized", 401);

    const userId = jwt.verify(token, process.env.JWT_SECRET).id;

    const user = await userModel.findById(userId);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isLogged;
