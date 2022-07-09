const express = require("express");
const {
  postAdministrator,
  patchAdministrator,
} = require("../controllers/administratorController");

const expertRouter = express.Router();

expertRouter.route("/").post(postAdministrator);
expertRouter.route("/:id").patch(patchAdministrator);

module.exports = expertRouter;
