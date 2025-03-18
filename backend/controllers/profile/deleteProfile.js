const userModel = require("../../models/userModel");

const deleteProfile = async (req, res, next) => {
  try {
    const user = req.user;
    await userModel.findOneAndDelete({ _id: user._id });
    res.send("Deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = deleteProfile;
