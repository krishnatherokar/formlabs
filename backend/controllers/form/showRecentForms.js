const formModel = require("../../models/formModel");

const showRecentForms = async (req, res, next) => {
  try {
    const recentForms = await formModel
      .find({})
      .select("-questions -responses")
      .sort({ _id: -1 })
      .limit(10)
      .populate({ path: "userInfo", select: "name" });

    res.json(recentForms);
  } catch (error) {
    next(error);
  }
};

module.exports = showRecentForms;
