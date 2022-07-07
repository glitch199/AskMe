const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid Credentials",
      });
    }
    const arePasswordsSame = await bcrypt.compare(password, user.password);
    if (!arePasswordsSame) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid Credentials",
      });
    }
    jwt.sign(
      { username },
      process.env.TOKEN_SECRET,
      { expiresIn: "15 days" },
      (err, jwt) => {
        if (err) {
          throw new Exception(err);
        }
        const daysToExpire = 15;
        res.cookie("token", jwt, {
          maxAge: daysToExpire * 24 * 60 * 60 * 1000,
        });
        return res.json({
          status: "success",
          message: "user logged successfully",
          data: {
            jwt,
            user: user,
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        "Something went wrong on our servers while processing your request. Please try again"
      );
  }
};
exports.authenticate = async (req, res) => {
  const token = req.headers["authorization"];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
    if (err)
      return res.status(401).json({
        status: "failed",
        message: "Invalid Credentials",
      });
    UserModel.findOne({ username: decode.username })
      .then((user) =>
        res.json({
          status: "success",
          message: "authentication was successful",
          data: {
            user: user,
          },
        })
      )
      .catch(() =>
        res
          .status(500)
          .json(
            "Something went wrong on our servers while processing your request. Please try again"
          )
      );
    decode;
  });
};
