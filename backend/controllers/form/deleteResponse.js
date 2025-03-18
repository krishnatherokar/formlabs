const responseModel = require("../../models/responseModel");

const deleteResponse = async (req, res, next) => {
  try {
    const user = req.user;
    const id = req.params.id;
    if (!user.responses.includes(id)) {
      throw new backendError("Not authorized to delete this", 401);
    }

    let result = await responseModel.deleteOne({ _id: id });
    if (result.deletedCount != 1) {
      throw new backendError("Not found", 404);
    }
    user.responses.splice(user.responses.indexOf(id), 1);
    await user.save();
    res.send("Deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = deleteResponse;
