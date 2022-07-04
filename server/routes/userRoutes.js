const express = require("express");
const {
  getAllUsers,
  getUserByEmailOrUsername,
} = require("../controllers/userController");
// const {
//   validateUser,
// } = require("../middlewares/ValidationMiddlewares/userValidationMiddlewares");
const userRouter = express.Router();

userRouter.route("/").get(getAllUsers);
userRouter.route("/:usernameOrEmail").get(getUserByEmailOrUsername);

module.exports = userRouter;
