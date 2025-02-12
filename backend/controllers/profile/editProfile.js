const editProfile = async (req, res) => {
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
    res.status(400).json(error.message);
  }
};

module.exports = editProfile;
