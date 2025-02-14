const formModel = require("../../models/formModel");

const getForm = async (req, res, next) => {
  try {
    const form = await formModel.findById(req.params.id);
    if (!form) throw new backendError("Form not found", 404);
    res.json(form);
  } catch (error) {
    next(error);
  }
};

module.exports = getForm;
