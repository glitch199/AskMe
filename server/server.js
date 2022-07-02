const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./pipeline.js");

dotenv.config({
  path: `${__dirname}/config.env`,
});

const connection_string = process.env.CONNECTION_STRING.replace(
  "<password>",
  process.env.PASSWORD
);
mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to Mongoose"))
  .catch((error) => console.log(`ERROR: ${error}`));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running.... on ${port}`);
});
