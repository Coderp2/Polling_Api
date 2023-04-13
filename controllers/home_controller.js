const Questions = require("../models/question");
const Options = require("../models/option");

module.exports.front = async function (req, res) {
  try {
    // finding all the questions and returning
    let question = await Questions.find({}).populate({
      path: "option",
    });

    if (question) {
      return res.status(200).json({
        message: "Here are the questions",
        data: question,
      });
    } else {
      return res.status(400).json({
        message: "Question does not does not exists",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error from the server ",
      data: err,
    });
  }
};