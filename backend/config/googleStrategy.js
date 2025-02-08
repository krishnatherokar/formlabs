const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require('./dotenvconfig')

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/user/google/verify",
    },
    async (accessToken, refreshToken, profile, setUser) => {
      return setUser(null, profile);
    }
  )
);
