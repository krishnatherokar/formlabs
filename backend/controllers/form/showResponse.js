const responseModel = require("../../models/responseModel");

const showResponse = async (req, res, next) => {
  try {
    const response = await responseModel
      .findById(req.params.id)
      .populate([{ path: "formInfo" }, { path: "userInfo", select: "name" }]);
    if (!response) throw new backendError("Response not found", 404);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = showResponse;
