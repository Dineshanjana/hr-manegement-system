const db = require("../db");

const createUser = (email, hashedPassword, role, serviceNumber, callback) => {
	serviceNumber = serviceNumber ? serviceNumber.toString() : "";

	const sql = `INSERT INTO users (email, password, role, service_number) VALUES (?, ?, ?, ?)`;
	db.query(sql, [email, hashedPassword, role, serviceNumber], (err, result) => {
		if (err) {
			return callback(err);
		}
		callback(null, result);
	});
};

// const getUserByUsername = (username, callback) => {
// 	const sql = "SELECT * FROM users WHERE username = ?";
// 	db.query(sql, [username], (err, result) => {
// 		if (err) {
// 			return callback(err);
// 		}
// 		callback(null, result);
// 	});
// };

const getAllAdmins = (callback) => {
	const sql = "SELECT * FROM users WHERE role = 'admin'";
	db.query(sql, (err, results) => {
		if (err) {
			return callback(err);
		}
		callback(null, results);
	});
};

module.exports = { createUser, getAllAdmins };
