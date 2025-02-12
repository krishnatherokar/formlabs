module.exports = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ALLOWED);
  next();
};
