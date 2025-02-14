const responseModel = require("../../models/responseModel");

const showResponse = async (req, res, next) => {
  try {
    const response = await responseModel.findById(req.params.id);
    if (!response) throw new backendError("Response not found", 404);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = showResponse;
