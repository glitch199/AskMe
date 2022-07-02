const bcrypt = require("bcrypt");
const { morphism } = require("morphism");
const UserModel = require("../models/UserModel");
const schema = require("../morphismSchemas/UserSchema");
exports.postUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({ email, password: hash });
    return res.status(201).json({
      status: "success",
      message: "user registered successfully",
      data: {
        user: morphism(schema, newUser),
      },
    });
  } catch (error) {
    return res.status(500);
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
    return res
      .status(500)
      .json(
        "Something went wrong on our servers while processing your request. Please try again"
      );
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
    return res
      .status(500)
      .json(
        "Something went wrong on our servers while processing your request. Please try again"
      );
  }
};
