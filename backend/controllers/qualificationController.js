const qualificationsModel = require("../models/qualificationModel");

const qualificationsController = {
	createQualification: (req, res) => {
		const newQualification = req.body;
		qualificationsModel.insertQualification(newQualification, (err, result) => {
			if (err) {
				return res.status(500).send("Error inserting qualification");
			}
			res.status(201).send("Qualification created successfully");
		});
	},

	listQualifications: (req, res) => {
		qualificationsModel.getQualifications((err, results) => {
			if (err) {
				return res.status(500).send("Error fetching qualifications");
			}
			res.status(200).json(results);
		});
	},

	getQualification: (req, res) => {
		const { id } = req.params;
		qualificationsModel.getQualificationById(id, (err, result) => {
			if (err) {
				return res.status(500).send("Error fetching qualification");
			}
			res.status(200).json(result);
		});
	},
};

module.exports = qualificationsController;
