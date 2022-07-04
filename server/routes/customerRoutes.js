const express = require("express");
const { postCustomer: postUser } = require("../controllers/customerController");
// const {
//   validateUser,
// } = require("../middlewares/ValidationMiddlewares/userValidationMiddlewares");
const customerRouter = express.Router();

customerRouter.route("/").post(postUser);

module.exports = customerRouter;
