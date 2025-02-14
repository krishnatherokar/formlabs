const editProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const allowedFields = ["name"];
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        user[key] = req.body[key];
      }
    });
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = editProfile;
