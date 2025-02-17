const userModel = require("../../models/userModel");
const saveToken = require("../../utils/saveToken");
const bcrypt = require("bcrypt");

const logNewUser = async (req, res, next) => {
  try {
    const { name, email, password, otp } = req.body;
    const user = await userModel.findOne({ email });

    if (user) throw new backendError("Already a member, please log in", 400);

    const valid = req.cookies.otp
      ? bcrypt.compare(otp, req.cookies.otp)
      : false;

    if (!valid) throw new backendError("Invalid OTP", 401);

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPass,
    });
    // save the token using jwt for future refrences
    await saveToken(newUser._id, res);

    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = logNewUser;
