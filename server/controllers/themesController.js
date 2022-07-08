const ThemeModel = require("../models/Themes");
exports.postTheme = async (req, res) => {
  try {
    const newTheme = await ThemeModel.create(req.body);
    newTheme.id = newTheme._id;
    delete newTheme._id;
    res.status(201).json({
      status: "success",
      message: "Theme added successfully",
      data: {
        theme: newTheme,
      },
    });
  } catch (error) {
    return res.status(500).json();
  }
};
exports.patchTheme = async (req, res) => {
  try {
    const theme = await ThemeModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!theme) {
      return res.status(404).json({
        status: "failed",
        message: "The theme you're looking for doesn't exist",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Theme updated successfully",
      data: {
        theme: theme,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message:
        "SORRY: something gone wrong in the server when processing your request",
    });
  }
};
exports.getThemes = async (req, res) => {
  try {
    const themeIds = req.query.themeIds;
    const sortBy = req.query.sortBy;
    let themes;
    if (themeIds) {
      themes = await ThemeModel.find()
        .where("_id")
        .in(themeIds)
        .sort({ name: sortBy ? sortBy : "asc" })
        .exec();
    } else {
      themes = await ThemeModel.find()
        .sort({ name: sortBy ? sortBy : "asc" })
        .exec();
    }

    return res.json({ data: themes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
