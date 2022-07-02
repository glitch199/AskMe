const express = require("express");
const {
  postUser,
  getAllUsers,
  getUserByEmail,
} = require("../controllers/userController");
const {
  validateUser,
} = require("../middlewares/ValidationMiddlewares/userValidationMiddlewares");
const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(validateUser, postUser);
userRouter.route("/:email").get(getUserByEmail);

module.exports = userRouter;
