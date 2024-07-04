const armyCourseModel = require("../models/qualificationModel");

const qualificationController = {
	insertCourse: (req, res) => {
		const { CourseName, grading } = req.body;

		if (!CourseName || !grading) {
			return res.json({
				status: 400,
				error: "CourseName and grading are required",
			});
		}
		armyCourseModel.insertCourse(CourseName, grading, (err, results) => {
			if (err) {
				return res.json({ status: 500, error: "Error adding course" });
			}
			res.json({
				status: 201,
				message: "Course added successfully",
				courseId: results.insertId,
			});
		});
	},
	getCourses: (req, res) => {
		armyCourseModel.getCourses((err, results) => {
			if (err) {
				return res.json({ status: 500, error: "Error fetching courses" });
			}
			res.json({ status: 200, results });
		});
	},
};

module.exports = qualificationController;
