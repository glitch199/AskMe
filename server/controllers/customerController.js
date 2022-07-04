const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
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
