const db = require("../db");

const armyCourseModel = {
	insertCourse: (CourseName, grading, callback) => {
		const sql = "INSERT INTO armyCourse (CourseName, grading) VALUES (?, ?)";
		db.query(sql, [CourseName, grading], (err, results) => {
			if (err) {
				return callback(err);
			}
			callback(null, results);
		});
	},

	getCourses: (callback) => {
		const sql = "SELECT * FROM armyCourse";
		db.query(sql, (err, results) => {
			if (err) {
				return callback(err);
			}
			callback(null, results);
		});
	},
};

module.exports = armyCourseModel;
