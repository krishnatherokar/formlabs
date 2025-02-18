const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
  title: String,
  description: String,
  userName: String,
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "form",
  },
  answers: [String],
});

module.exports = mongoose.model("response", responseSchema);
