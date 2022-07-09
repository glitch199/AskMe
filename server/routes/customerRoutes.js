const express = require("express");
const { postCustomer: postUser } = require("../controllers/customerController");

const customerRouter = express.Router();

customerRouter.route("/").post(postUser);

module.exports = customerRouter;
