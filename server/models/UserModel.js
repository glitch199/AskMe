const { Schema, ObjectId, model } = require("mongoose");

const userSchema = Schema({
  username: String,
  password: String,
  fullName: String,
  email: String,
  userType: {
    type: String,
    enum: ["Customer", "Administrator", "Expert"],
    default: "Customer",
  },
  birthDate: Date,
  loc: { x: Number, y: Number }, //{type: Object, default: {x: 0, y:0}}
  work_phone: String,
  phone_number: String,
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  queries: {
    type: [ObjectId],
    ref: "Query",
  },
  themes: {
    type: [ObjectId],
    ref: "Theme",
  },
  favorite_experts: {
    type: [ObjectId],
    ref: "User",
  },
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
