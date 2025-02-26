const formModel = require("../../models/formModel");

const deleteForm = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.id;
    if (!user.forms.includes(id)) {
      throw new backendError("Not authorized to delete this", 401);
    }

    let result = await formModel.deleteOne({ _id: id });
    if (result.deletedCount != 1) {
      throw new backendError("Not found", 404);
    }
    user.forms.splice(user.forms.indexOf(id), 1);
    await user.save();
    res.send("Deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = deleteForm;
