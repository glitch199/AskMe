const express = require("express");
const {
  postCustomer,
  postQueryForCustomer,
} = require("../controllers/customerController");

const customerRouter = express.Router();

customerRouter.route("/").post(postCustomer);
customerRouter.route("/:customerId/queries").post(postQueryForCustomer);

module.exports = customerRouter;
