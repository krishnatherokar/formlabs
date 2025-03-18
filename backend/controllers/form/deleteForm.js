const formModel = require("../../models/formModel");

const deleteForm = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.id;
    if (!user.forms.includes(id)) {
      throw new backendError("Not authorized to delete this", 401);
    }

    await formModel.findOneAndDelete({ _id: id });
    user.forms.splice(user.forms.indexOf(id), 1);
    await user.save();
    res.send("Deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = deleteForm;
