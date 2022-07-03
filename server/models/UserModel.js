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
  bills: {
    type: [ObjectId],
    ref: "Bill",
  },
  themes: {
    type: [ObjectId],
    ref: "Expertize",
  },
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
