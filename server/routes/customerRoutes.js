const express = require("express");
const {
  postCustomer: postUser,
  getAllUsers,
  getUserByEmail,
} = require("../controllers/customerController");
// const {
//   validateUser,
// } = require("../middlewares/ValidationMiddlewares/userValidationMiddlewares");
const customerRouter = express.Router();

customerRouter.route("/").get(getAllUsers).post(postUser);
customerRouter.route("/:email").get(getUserByEmail);

module.exports = customerRouter;
