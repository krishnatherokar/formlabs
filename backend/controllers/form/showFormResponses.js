const formModel = require("../../models/formModel");

const showFormResponses = async (req, res, next) => {
  try {
    const user = req.user;
    const form = await formModel.findOne({ _id: req.params.id });

    // check if the user who is trying to access the responses is the one who created the form
    if (!form.userInfo.equals(user._id))
      throw new backendError(
        "You do not have the permission to access this page",
        403
      );

    const { toSkip } = req.query || 0;
    await form.populate({
      path: "responses",
      select: "_id userInfo",
      options: { sort: { _id: -1 }, skip: 10 * toSkip, limit: 10 },
      populate: {
        path: "userInfo",
        select: "name",
      },
    });

    res.json(form.responses);
  } catch (error) {
    next(error);
  }
};

module.exports = showFormResponses;
