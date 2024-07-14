const express = require("express");
const router = express.Router();
const qualificationsController = require("../controllers/qualificationController");

router.post("/qualifications", qualificationsController.createQualification);
router.get("/qualifications", qualificationsController.listQualifications);
router.get("/qualifications/:id", qualificationsController.getQualification);

module.exports = router;
