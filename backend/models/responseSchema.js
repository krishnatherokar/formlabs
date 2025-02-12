const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  answers: [String],
});

module.exports = mongoose.model("response", responseSchema);
