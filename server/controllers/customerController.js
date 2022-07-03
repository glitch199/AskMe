const bcrypt = require("bcrypt");
const { morphism } = require("morphism");
const UserModel = require("../models/UserModel");
const schema = require("../morphismSchemas/UserSchema");
exports.postCustomer = async (req, res) => {
  try {
    const input = req.body;
    const hash = await bcrypt.hash(input.password, 12);
    input.password = hash;
    const newCustomer = await UserModel.create(input);
    delete newCustomer.password;
    return res.status(201).json({
      status: "success",
      message: "user registered successfully",
      data: {
        customer: newCustomer,
      },
    });
  } catch (error) {
    return res.status(500).json();
  }
};
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "There's no user registered with that email",
      });
    }
    return res.json({
      status: "success",
      message: "user found",
      data: {
        user: morphism(schema, user),
      },
    });
  } catch (error) {
    return res.status(500).json();
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.json({
      status: "successful",
      results: users.length,
      data: {
        users: morphism(schema, users),
      },
    });
  } catch (error) {
    return res.status(500).json();
  }
};
