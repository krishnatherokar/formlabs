const userModel = require("../../models/userModel");
const saveToken = require("../../utils/saveToken");
const bcrypt = require("bcrypt");

const logUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) throw new backendError("Invalid credentials", 401);

    // compare the user submitted password and the hashed password in the database
    const valid = user.password
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!valid) {
      // if the password is not valid but the user has a googleId in database
      if (user.googleId)
        throw new backendError(
          "This account is linked to Google, please log in using Google",
          400
        );

      // in case the password is not valid nor the user has a googleId
      throw new backendError("Invalid credentials", 401);
    }

    // save the token using jwt for future refrences
    await saveToken(user._id, res);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = logUser;
