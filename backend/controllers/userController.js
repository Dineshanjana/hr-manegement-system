const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getAllAdmins } = require("../models/userModel");

const register = (req, res) => {
	const { email, password, role, service_number } = req.body;
	// if (role === "admin" && req.role !== "superadmin") {
	// 	return res
	// 		.status(403)
	// 		.json({ message: "Only superadmins can create admins" });
	// }
	bcrypt.hash(password, 10, (err, hash) => {
		if (err) {
			return res.status(500).send("Error hashing password");
		}

		createUser(email, hash, role, service_number, (err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).send("Error registering user");
			}

			res.status(200).send("User registered successfully");
		});
	});
};
const getAdminsController = (req, res) => {
	if (req.user.role !== "superadmin") {
		return res
			.status(403)
			.json({ message: "Only superadmin can access this resource." });
	}

	getAllAdmins((err, results) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(200).json(results);
	});
};

const login = (req, res) => {
	const { email, password } = req.body;

	getUserByUsername(email, (err, result) => {
		if (err) {
			return res.status(500).send("Error logging in");
		}

		if (result.length === 0) {
			return res.status(401).send("User not found");
		}

		const user = result[0];

		bcrypt.compare(password, user.password, (err, isMatch) => {
			if (err) {
				return res.status(500).send("Error comparing passwords");
			}

			if (!isMatch) {
				return res.status(401).send("Invalid password");
			}

			const token = jwt.sign(
				{ id: user.id, role: user.role },
				process.env.JWT_SECRET_KEY,
				{ expiresIn: "6m" }
			);
			req.session.user = { id: user.id, email: user.email, role: user.role }; // Adjusted to use 'email' instead of 'username'
			res.status(200).json({ token });
		});
	});
};

const logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).send("Error logging out");
		}
		res.status(200).send("Logged out successfully");
	});
};

module.exports = { register, login, logout, getAdminsController };
