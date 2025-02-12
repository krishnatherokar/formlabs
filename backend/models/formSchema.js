const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  title: String,
  description: String,
  userId: {
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

module.exports = mongoose.model("form", formSchema);
