const bcrypt = require("bcrypt");
const { morphism } = require("morphism");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const schema = require("../morphismSchemas/UserSchema");
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
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
      { email },
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
            user: morphism(schema, user),
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
    UserModel.findOne({ email: decode.email })
      .then((user) =>
        res.json({
          status: "success",
          message: "authentication was successful",
          data: {
            user: morphism(schema, user),
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
exports.logOut = async (req, res) => {
  const token = req.headers["authorization"];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
    if (err)
      return res.status(401).json({
        status: "failed",
        message: "Invalid Credentials",
      });
    res.removeHeaders("authorization").json("You have log out successfully");
  });
};
