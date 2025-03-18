const formModel = require("../../models/formModel");

const createForm = async (req, res, next) => {
  try {
    const user = req.user;
    const form = await formModel.create({
      ...req.body,
      userInfo: user._id,
    });

    user.forms.push(form._id);
    await user.save();

    res.json(form._id);
  } catch (error) {
    next(error);
  }
};

module.exports = createForm;
