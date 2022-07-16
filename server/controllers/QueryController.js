const QueryModel = require("../models/QueryModel");

exports.getAllQueries = async (req, res) => {
  try {
    const query = await QueryModel.find();
    return res.json({
      status: "successful",
      results: query.length,
      data: {
        queries: query,
      },
    });
  } catch (error) {
    return res.status(500).json();
  }
};
