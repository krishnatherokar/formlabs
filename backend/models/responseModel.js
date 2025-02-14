const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "form",
  },
  answers: [String],
});

module.exports = mongoose.model("response", responseSchema);
