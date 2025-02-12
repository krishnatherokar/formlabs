const userSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const isLogged = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("Unauthorized");

    const userId = jwt.verify(token, process.env.JWT_SECRET).id;
    
    const user = await userSchema.findById(userId);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json(error.message);
  }
};

module.exports = isLogged;
