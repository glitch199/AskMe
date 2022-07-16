const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const QueryModel = require("../models/QueryModel");

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
exports.postQueryForCustomer = async (req, res) => {
  const customerId = req.params.customerId;
  let queryInput = req.body;
  const customer = await UserModel.findOne({
    _id: customerId,
    userType: "Customer",
  });
  if (!customer) {
    return res.status(404).json({
      status: "failed",
      message: "The customer you're looking for doesn't exist",
    });
  }
  const query = await QueryModel.create(queryInput);
  await UserModel.findByIdAndUpdate(customerId, {
    queries: customer.queries.concat(query._id),
  });
  res
    .status(201)
    .json({ message: "Customer's query has been successfully created" });
};
