const express = require("express");
const router = express.Router();
const app = express();

console.log("router loaded");
const homeController = require("../controllers/home_controller");

router.get("/",homeController.front);

router.use("/questions",require("./questions"));
router.use("/options",require("./options"));

module.exports = router;