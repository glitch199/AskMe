const UserModel = require("../models/UserModel");
exports.getUserByEmailOrUsername = async (req, res) => {
  const params = req.params;
  try {
    const user = await UserModel.findOne({
      $or: [
        { username: params.usernameOrEmail },
        { email: params.usernameOrEmail },
      ],
    });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "There's no user registered with that username or email",
      });
    }
    return res.json({
      status: "success",
      message: "user found",
      data: {
        user: user,
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
        users: users,
      },
    });
  } catch (error) {
    return res.status(500).json();
  }
};
