const UserModel = require("../models/UserModel");
const ThemeModel = require("../models/ThemeModel");
exports.getExperts = async (req, res) => {
  try {
    const search_parameter = req.query.name;
    let experts = search_parameter
      ? await UserModel.find({
          userType: "Expert",
          fullName: { $regex: search_parameter, $options: "i" },
        })
      : await UserModel.find({
          userType: "Expert",
        });

    return res.json({ data: experts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.getThemesByExpert = async (req, res) => {
  try {
    const expertId = req.params.expertId;
    const expert = await UserModel.findOne({
      _id: expertId,
      userType: "Expert",
    }).populate("themes");
    if (!expert) {
      return res.status(404).json({
        status: "failed",
        message: "The expert you're looking for doesn't exist",
      });
    }
    return res.json({ data: expert.themes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateThemesByExpert = async (req, res) => {
  try {
    const expertId = req.params.expertId;
    let themesId = req.body.themes;
    themesId = themesId ? themesId : [];
    const expert = UserModel.findOne({ _id: expertId, userType: "Expert" });
    if (!expert) {
      return res.status(404).json({
        status: "failed",
        message: "The expert you're looking for doesn't exist",
      });
    }

    await UserModel.findByIdAndUpdate(expertId, { themes: themesId });
    res.json();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
