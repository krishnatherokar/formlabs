const userModel = require("../../models/userModel");
const saveToken = require("../../utils/saveToken");
const bcrypt = require("bcrypt");
require("../../config/dotenvconfig");

const logGoogle = async (req, res, next) => {
  try {
    // extract the details from Google Response
    const { id, displayName, emails } = req.user;
    const userEmail = emails[0].value;

    // check if the user already exists
    let existingUser = await userModel.findOne({ email: userEmail });

    if (!existingUser) {
      // if not, create a new user and save the hashed googleId
      const hashedId = await bcrypt.hash(id, 10);
      existingUser = await userModel.create({
        name: displayName,
        email: userEmail,
        googleId: hashedId,
      });
    }

    await saveToken(existingUser._id, res);

    res.redirect(`${process.env.FRONTEND_BASE}/#${req.cookies.redirectTo}`);
    // the url is combination of frontend base url from environment variables and redirect cookie, if the cookie is null or undefined, frontend will redirect the user to home page
  } catch (error) {
    next(error);
  }
};

module.exports = logGoogle;
