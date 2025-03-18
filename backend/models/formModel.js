const mongoose = require("mongoose");
const responseModel = require("./responseModel");

const formSchema = mongoose.Schema({
  title: String,
  description: String,
  userInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  questions: [
    {
      question: String,
      component: String,
      options: [String],
    },
  ],
  responses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "response",
    },
  ],
});

formSchema.pre("findOneAndDelete", async function (next) {
  const form = await this.model.findOne(this.getQuery());
  if (form) await responseModel.deleteMany({ formInfo: form._id });
  next();
});

module.exports = mongoose.model("form", formSchema);
