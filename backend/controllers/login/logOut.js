const logOut = (req, res, next) => {
  try {
    const isProduction = process.env.ENVIRONMENT == "production";
    res.cookie("token", "", {
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax", // allow cross-site requests
      secure: isProduction,
      maxAge: 0,
    });
    res.send("Logged out");
  } catch (error) {
    next(error);
  }
};

module.exports = logOut;
