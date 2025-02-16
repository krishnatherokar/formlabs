const getRedirectUrl = (req, res, next) => {
  // get the redirectTo query
  const { redirectTo } = req.query;

  // set the cookie that expires in 5 minutes
  res.cookie("redirectTo", redirectTo || "/user", {
    httpOnly: true,
    maxAge: 5 * 60 * 1000,
  });
  next();
};

module.exports = getRedirectUrl;
