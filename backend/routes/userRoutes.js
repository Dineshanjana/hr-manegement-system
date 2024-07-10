// backend\routes\userRoutes.js
const express = require("express");
const isSuperAdmin = require("../middleware/superAdminAuth");

const {
	register,
	login,
	logout,
	getAdminsController,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", register); //isSuperAdmin
router.post("/login", login);
router.post("/logout", logout);
router.get("/admins", isSuperAdmin, getAdminsController);

module.exports = router;
