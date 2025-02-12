const jwt = require("jsonwebtoken");

const saveToken = async (userId, res) => {
    // generate a token
  const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // set the token in a cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.ENVIRONMENT === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

module.exports = saveToken;