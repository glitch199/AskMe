const express = require("express");
const {
  getExperts,
  getThemesByExpert,
  updateThemesByExpert,
} = require("../controllers/expertController");

const expertRouter = express.Router();

expertRouter.route("/").get(getExperts);
expertRouter
  .route("/:expertId/themes")
  .get(getThemesByExpert)
  .patch(updateThemesByExpert);

module.exports = expertRouter;
