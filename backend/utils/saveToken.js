const jwt = require("jsonwebtoken");

const saveToken = async (userId, res) => {
  // generate a token
  const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const isProduction = process.env.ENVIRONMENT == "production";

  // set the token in a cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: isProduction ? "None" : "Lax", // allow cross-site requests
    secure: isProduction,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = saveToken;
