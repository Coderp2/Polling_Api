const express = require('express');

const router = express.Router();
const app = express()
const QuestionController = require("../controllers/questions_controller");

router.post("/create",QuestionController.create)
router.get("/:id/delete",QuestionController.deleteQuestion);
router.post("/:id/options/create",QuestionController.addOptions);
router.get("/:id",QuestionController.showAllQuestions);

module.exports = router;
