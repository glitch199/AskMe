const express = require("express");
const { getExperts } = require("../controllers/expertController");

const expertRouter = express.Router();

expertRouter.route("/").get(getExperts);

module.exports = expertRouter;
