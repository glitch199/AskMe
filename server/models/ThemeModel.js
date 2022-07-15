const { Schema, ObjectId, model } = require("mongoose");

const themesSchema = Schema({
  name: String,
  cost_per_minute: Number,
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  experts: [{ type: ObjectId, ref: "Users" }],
});

const ThemeModel = model("Theme", themesSchema);

module.exports = ThemeModel;
