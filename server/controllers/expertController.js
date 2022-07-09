const UserModel = require("../models/UserModel");
exports.getExperts = async (req, res) => {
  try {
    const search_parameter = req.query.name;
    console.log(search_parameter);
    let themes = search_parameter
      ? await UserModel.find({
          userType: "Expert",
          fullName: { $regex: search_parameter, $options: "i" },
        })
      : await UserModel.find({
          userType: "Expert",
        });

    return res.json({ data: themes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
