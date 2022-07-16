const { Schema, ObjectId, model } = require("mongoose");

const QuerySchema = Schema({
  startDate: Date,
  customer: {
    type: ObjectId,
    ref: "User",
  },
  theme: {
    type: ObjectId,
    ref: "Theme",
  },
  expert: {
    type: ObjectId,
    ref: "User",
  },
  minutes: Number,
  total: Number,
  endDate: Date,
  feedback: {
    score: Number,
    comment: String,
  },
  chat: [
    {
      from: {
        type: ObjectId,
        ref: "User",
      },
      to: {
        type: ObjectId,
        ref: "User",
      },
      message: String,
    },
  ],
});

const QueryModel = model("Query", QuerySchema);

module.exports = QueryModel;
