const express = require("express");
const {
  postTheme,
  patchTheme,
  getThemes,
} = require("../controllers/themesController");
// const {
//   validateUser,
// } = require("../middlewares/ValidationMiddlewares/userValidationMiddlewares");
const themeRouter = express.Router();

themeRouter.route("/").post(postTheme).get(getThemes);
themeRouter.route("/:id").patch(patchTheme);
module.exports = themeRouter;
