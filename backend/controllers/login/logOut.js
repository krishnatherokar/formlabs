const logOut = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.send("Logged out");
  } catch (error) {
    next(error);
  }
};

module.exports = logOut;
