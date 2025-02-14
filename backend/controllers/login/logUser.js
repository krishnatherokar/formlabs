const userModel = require("../../models/userModel");
const saveToken = require("../../utils/saveToken");

const logUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) throw new backendError("Invalid credentials", 401);

    // Todo: compare password

    await saveToken(user._id, res);

    res.json("Logged in");
  } catch (error) {
    next(error);
  }
};

module.exports = logUser;
