const db = require("../db");

const qualificationsModel = {
	insertQualification: (qualification, callback) => {
		const sql =
			"INSERT INTO qualifications (tenth_marks, twelfth_marks, bachelor, master, service_number, personnel_id) VALUES (?, ?, ?, ?, ?, ?)";
		db.query(
			sql,
			[
				qualification.tenth_marks,
				qualification.twelfth_marks,
				qualification.bachelor,
				qualification.master,
				qualification.service_number,
				qualification.personnel_id,
			],
			(err, result) => {
				if (err) {
					return callback(err);
				}
				callback(null, result);
			}
		);
	},

	getQualifications: (callback) => {
		const sql = "SELECT * FROM qualifications";
		db.query(sql, (err, results) => {
			if (err) {
				return callback(err);
			}
			callback(null, results);
		});
	},

	getQualificationById: (id, callback) => {
		const sql = "SELECT * FROM qualifications WHERE id = ?";
		db.query(sql, [id], (err, result) => {
			if (err) {
				return callback(err);
			}
			callback(null, result);
		});
	},
};

module.exports = qualificationsModel;
