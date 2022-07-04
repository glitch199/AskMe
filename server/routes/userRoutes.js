const express = require("express");
const {
  getAllUsers,
  getUserByEmailOrUsername,
} = require("../controllers/userController");
const { login, authenticate } = require("../controllers/authController");
// const {
//   validateUser,
// } = require("../middlewares/ValidationMiddlewares/userValidationMiddlewares");
const userRouter = express.Router();

userRouter.route("/").get(getAllUsers);
userRouter.route("/login").post(login);
userRouter.route("/authenticate").post(authenticate);
userRouter.route("/logout").post();
userRouter.route("/:usernameOrEmail").get(getUserByEmailOrUsername);

module.exports = userRouter;
