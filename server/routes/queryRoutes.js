const express = require("express");
const { getAllQueries } = require("../controllers/QueryController");

const userRouter = express.Router();

userRouter.route("/").get(getAllQueries);

module.exports = userRouter;
