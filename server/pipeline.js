const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const customerRoutes = require("./routes/customerRoutes");
const userRoutes = require("./routes/userRoutes");
const themeRoutes = require("./routes/themeRoutes");
const expertRoutes = require("./routes/expertRoutes");
const administratorRoutes = require("./routes/administratorRoutes");
const queryRoutes = require("./routes/queryRoutes");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(multer().none());
app.use(cookieParser());

app.use("/api/customers", customerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/themes", themeRoutes);
app.use("/api/administrators", administratorRoutes);
app.use("/api/experts", expertRoutes);
app.use("/api/queries", queryRoutes);

module.exports = app;
