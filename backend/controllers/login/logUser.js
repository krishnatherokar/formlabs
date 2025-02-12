const userSchema = require("../../models/userSchema");
const saveToken = require("../../utils/saveToken");

const logUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await userSchema.findOne({email});

    if (!user) throw new Error("Invalid credentials");

    // Todo: compare password

    saveToken(user._id, res);

    res.json("Logged in");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = logUser;
