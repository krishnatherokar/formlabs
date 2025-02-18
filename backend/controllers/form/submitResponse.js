const formModel = require("../../models/formModel");
const responseModel = require("../../models/responseModel");

const submitResponse = async (req, res, next) => {
  try {
    const formId = req.params.id;
    const answers = req.body.answers;
    const user = req.user;
    const form = await formModel.findById(formId);
    const response = await responseModel.create({
      title: form.title,
      description: form.description,
      userName: user.name,
      formId: form._id,
      answers,
    });

    form.responses.push(response._id);
    user.resArr.push(response._id);
    user.responses.push({
      formId: form._id,
      responseId: response._id,
    });

    await form.save();
    await user.save();

    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = submitResponse;
