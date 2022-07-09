const bcrypt = require("bcrypt");

const UserModel = require("../models/UserModel");

exports.postAdministrator = async (req, res) => {
  try {
    const input = req.body;
    const hash = await bcrypt.hash(input.password, 12);
    input.password = hash;
    const newAdministrator = await UserModel.create(input);
    delete newAdministrator.password;
    return res.status(201).json({
      status: "success",
      message: "Administrator user registered successfully",
      data: {
        user: newAdministrator,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.patchAdministrator = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({
      _id: id,
      userType: {
        $in: ["Administrator", "Expert"],
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "The Administrator user you're looking for doesn't exist",
      });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "Administrator User updated successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message:
        "SORRY: something gone wrong in the server when processing your request",
    });
  }
};
