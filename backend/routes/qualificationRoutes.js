const express = require("express");
const router = express.Router();
const qualificationController = require("../controllers/qualificationController");

router.post("/addCourse", qualificationController.insertCourse);
router.get("/getCourses", qualificationController.getCourses);

module.exports = router;
