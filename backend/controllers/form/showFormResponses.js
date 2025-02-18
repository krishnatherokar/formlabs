const formModel = require("../../models/formModel");

const showFormResponses = async (req, res, next) => {
  try {
    const user = req.user;
    const form = await formModel.findOne({ _id: req.params.id });

    // check if the user who is trying to access the responses is the one who created the form
    if (!form.userId.equals(user._id))
      throw new backendError(
        "You do not have the permission to access this page",
        403
      );

    const { toSkip } = req.query || 0;
    await form.populate({
      path: "responses",
      select: "_id userName",
      options: { sort: { _id: -1 }, skip: 5 * toSkip, limit: 5 },
    });

    res.json(form.responses);
  } catch (error) {
    next(error);
  }
};

module.exports = showFormResponses;
