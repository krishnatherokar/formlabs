const formModel = require("./formModel");

mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  googleId: String,
  forms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "form",
    },
  ],
  responses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "response",
    },
  ],
});

userSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getQuery());
  if (user) {
    const forms = await formModel.find({ userInfo: user._id });
    for (const form of forms) {
      await formModel.findOneAndDelete({ _id: form._id });
    }
  }
  next();
});

module.exports = mongoose.model("user", userSchema);
