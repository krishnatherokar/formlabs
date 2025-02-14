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
      formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "form",
      },
      responseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "response",
      },
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
