const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const db = require("./db");
const wifeDetailsRoutes = require("./routes/wifeDetailsRoutes");
const personnelRoutes = require("./routes/personnelRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");
const qualificationRoutes = require("./routes/qualificationRoutes");
const additionalColumnsRoutes = require("./routes/AdditionalColumns");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(
	session({
		secret:
			"626d50aeade1d2ea701e706fb707836ac6cd30ea939807c22d6640fe5d5ca67866ec062a5cb7",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }, // Set secure to true if using https
	})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
	origin: "http://localhost:3000",
	methods: ["GET", "POST", "DELETE"],
	allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

// Route setup
app.use("/wifeDetails", wifeDetailsRoutes);
app.use("/personnel", personnelRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/users", userRoutes);
app.use("/qualification", qualificationRoutes);
app.use("/additional",additionalColumnsRoutes);


// Database connection
db.connect((err) => {
	if (err) {
		console.error("Database connection failed: ", err.stack);
		return;
	}
	console.log("Connected to database");
});

// Endpoint to fetch courses
app.get("/getcourses", (req, res) => {
	const query = "SELECT id, name FROM courses"; // Assuming courses table has id and name
	db.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching courses:", err);
			res.status(500).json({ message: "Error fetching courses" });
			return;
		}
		res.json(results);
	});
});

// Endpoint to fetch personnel courses with course details (name, start_date, end_date, grade)
app.get("/getpersonnelcourses/:serviceNumber", (req, res) => {
	const { serviceNumber } = req.params;
	const query = `
      SELECT pc.start_date, pc.end_date, pc.grade, c.name AS course_name
      FROM personnelcourses pc
      INNER JOIN courses c ON pc.course_id = c.id
      WHERE pc.service_number = ?
    `;
	db.query(query, [serviceNumber], (err, results) => {
		if (err) {
			console.error("Error fetching personnel courses:", err);
			res.status(500).json({ message: "Error fetching personnel courses" });
			return;
		}
		res.json(results);
	});
});

// Endpoint to add course to personnelcourses table
app.post("/addcourses", (req, res) => {
	const { serviceNumber, courseId, startDate, endDate, grade } = req.body;
	const query =
		"INSERT INTO personnelcourses (service_number, course_id, start_date, end_date, grade) VALUES (?, ?, ?, ?, ?)";
	const values = [serviceNumber, courseId, startDate, endDate, grade];

	db.query(query, values, (err, results) => {
		if (err) {
			console.error("Error adding course:", err);
			res.status(500).json({ message: "Error adding course" });
			return;
		}
		res.json({ message: "Course added successfully" });
	});
});

// Endpoint to fetch all courses with personnel count
app.get("/courses", (req, res) => {
	const query = `
      SELECT c.id, c.name, c.duration, COUNT(pc.service_number) AS personnel_count
      FROM courses c
      LEFT JOIN personnelcourses pc ON c.id = pc.course_id
      GROUP BY c.id, c.name, c.duration
    `;
	db.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching courses:", err);
			res.status(500).json({ message: "Error fetching courses" });
			return;
		}
		res.json(results);
	});
});

// Endpoint to add a new course
app.post("/courses/add", (req, res) => {
	const { name, duration } = req.body;
	const query = "INSERT INTO courses (name, duration) VALUES (?, ?)";
	const values = [name, duration];

	db.query(query, values, (err, result) => {
		if (err) {
			console.error("Error adding course:", err);
			res.status(500).json({ message: "Error adding course" });
			return;
		}
		res.json({
			message: "Course added successfully",
			courseId: result.insertId,
		});
	});
});

// Endpoint to fetch personnel enrolled in a course
app.get("/courses/:courseId/personnel", (req, res) => {
	const { courseId } = req.params;
	const query = `
      SELECT p.service_number, p.first_name, p.last_name, pc.start_date, pc.end_date, pc.grade
      FROM personnel p
      INNER JOIN personnelcourses pc ON p.service_number = pc.service_number
      WHERE pc.course_id = ?
    `;
	db.query(query, [courseId], (err, results) => {
		if (err) {
			console.error("Error fetching personnel for course:", err);
			res.status(500).json({ message: "Error fetching personnel for course" });
			return;
		}
		res.json(results);
	});
});

// Endpoint to search personnel by name or service number
app.get("/personnelsearch", (req, res) => {
	const { searchTerm } = req.query;
	const query = `
        SELECT personnel_id, service_number, first_name, last_name 
        FROM personnel 
        WHERE first_name LIKE ? OR last_name LIKE ? OR service_number LIKE ?
    `;
	db.query(
		query,
		[`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`],
		(err, results) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			res.json(results);
		}
	);
});

// Endpoint to create a new posting record
app.post("/posting", async (req, res) => {
	const {
		personnel_id,
		service_number,
		posted_to,
		start_date,
		end_date,
		no_of_days,
		prefix_date,
		suffix_date,
		remarks,
		reported_back,
		reporting_date,
	} = req.body;

	const query = `
      INSERT INTO posting 
      (personnel_id, service_number, posted_to, start_date, end_date, no_of_days, prefix_date, suffix_date, remarks, reported_back, reporting_date) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

	const values = [
		personnel_id,
		service_number,
		posted_to,
		start_date,
		end_date,
		no_of_days,
		prefix_date || null, // Convert empty string to null
		suffix_date || null, // Convert empty string to null
		remarks,
		reported_back,
		reporting_date || null, // Convert empty string to null
	];

	try {
		console.log("Query:", query); // Debugging: log the query
		console.log("Values:", values); // Debugging: log the values
		db.query(query, values, (err, results) => {
			if (err) {
				console.error("Error creating posting:", err);
				res.status(500).json({ error: "Error creating posting" });
				return;
			}
			res.json({
				message: "Posting created successfully",
				id: results.insertId,
			});
		});
	} catch (error) {
		res.status(500).json({ error: "Error creating posting" });
	}
});

// Endpoint to fetch all postings
app.get("/postings", (req, res) => {
	const query = `
      SELECT 
          p.personnel_id, 
          CONCAT(p.first_name, ' ', p.last_name) AS name, 
          ps.posted_to,
          ps.service_number, 
          ps.start_date, 
          ps.end_date, 
          ps.no_of_days, 
          ps.prefix_date, 
          ps.suffix_date, 
          ps.remarks, 
          ps.reported_back, 
          ps.reporting_date
      FROM 
          posting ps
      INNER JOIN 
          personnel p 
      ON 
          ps.personnel_id = p.personnel_id
  `;

	db.query(query, (err, results) => {
		if (err) {
			console.error("Error fetching postings:", err);
			res.status(500).json({ message: "Error fetching postings" });
			return;
		}
		res.json(results);
	});
});

// Endpoint to update a posting record
app.put("/postings/:personnel_id", (req, res) => {
	const {
		posted_to,
		start_date,
		end_date,
		no_of_days,
		prefix_date,
		suffix_date,
		remarks,
		reported_back,
		reporting_date,
	} = req.body;

	const { personnel_id } = req.params;

	const query = `
      UPDATE posting 
      SET posted_to = ?, start_date = ?, end_date = ?, no_of_days = ?, prefix_date = ?, suffix_date = ?, remarks = ?, reported_back = ?, reporting_date = ?
      WHERE personnel_id = ?
  `;

	const values = [
		posted_to,
		start_date,
		end_date,
		no_of_days,
		prefix_date,
		suffix_date,
		remarks,
		reported_back,
		reporting_date,
		personnel_id,
	];

	db.query(query, values, (err, results) => {
		if (err) {
			console.error("Error updating posting:", err);
			res.status(500).json({ message: "Error updating posting" });
			return;
		}
		res.json({ message: "Posting updated successfully" });
	});
});

// Endpoint to fetch postings for a specific service number
app.get("/postings/:service_number", async (req, res) => {
	const service_number = req.params.service_number;
	const query = `
    SELECT p.posted_to, p.start_date, p.end_date, p.no_of_days, p.prefix_date, p.suffix_date, p.remarks, p.reported_back, p.reporting_date 
    FROM posting p 
    JOIN personnel pe ON p.service_number = pe.service_number 
    WHERE p.service_number = ?
  `;

	db.query(query, [service_number], (err, results) => {
		if (err) {
			console.error("Error fetching postings:", err);
			res.status(500).json({ message: "Error fetching postings" });
			return;
		}
		res.json(results);
	});
});

// Endpoint to create a leave request
app.post("/leave", (req, res) => {
	const {
		personnel_id,
		service_number,
		start_date,
		end_date,
		prefix_on,
		suffix_on,
		no_of_days,
		remarks,
		leave_type,
		status,
		reported_back,
		reporting_date,
	} = req.body;

	// Format dates to MySQL DATE format (YYYY-MM-DD)
	const formattedStartDate = formatDate(start_date);
	const formattedEndDate = formatDate(end_date);
	const formattedPrefixOn = formatDate(prefix_on);
	const formattedSuffixOn = formatDate(suffix_on);
	const formattedReportingDate = formatDate(reporting_date);

	// SQL query to insert leave request into database
	const query = `
    INSERT INTO \`leave\` (personnel_id, service_number, start_date, end_date, prefix_on, suffix_on, no_of_days, remarks, leave_type, status, reported_back, reporting_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

	// Values to be inserted into the query
	const values = [
		personnel_id,
		service_number,
		formattedStartDate,
		formattedEndDate,
		formattedPrefixOn,
		formattedSuffixOn,
		no_of_days,
		remarks || "",
		leave_type,
		status || "pending",
		reported_back || "no",
		formattedReportingDate,
	];

	// Execute the SQL query using connection pool
	db.query(query, values, (err, result) => {
		if (err) {
			console.error("Error creating leave request", err);
			res.status(500).json({ error: "Internal server error" });
			return;
		}
		res.json({
			message: "Leave request created successfully",
			leave_id: result.insertId,
		});
	});
});

// Helper function to format date to MySQL DATE format (YYYY-MM-DD)
function formatDate(dateString) {
	if (!dateString) return null;
	const date = new Date(dateString);
	return date.toISOString().split("T")[0];
}

// API endpoint to fetch all leave records
app.get("/api/leave", (req, res) => {
	const sql =
		"SELECT l.leave_id, p.first_name, p.last_name, l.service_number, l.start_date, l.end_date, l.status, l.reporting_date FROM `leave` l LEFT JOIN personnel p ON l.personnel_id = p.personnel_id";

	db.query(sql, (err, rows, fields) => {
		if (err) {
			console.error("Error fetching leave records:", err);
			res.status(500).send("Error fetching leave records");
			return;
		}
		res.json(rows);
	});
});

// API endpoint to fetch leave record by leave_id
app.get("/api/leave/:leaveId", (req, res) => {
	const leaveId = req.params.leaveId;
	const sql =
		"SELECT l.leave_id, p.first_name, p.last_name, l.service_number, l.start_date, l.end_date, l.status, l.reporting_date FROM `leave` l LEFT JOIN personnel p ON l.personnel_id = p.personnel_id WHERE l.leave_id = ?";

	db.query(sql, [leaveId], (err, rows, fields) => {
		if (err) {
			console.error("Error fetching leave record:", err);
			res
				.status(500)
				.send(`Error fetching leave record with leave_id ${leaveId}`);
			return;
		}
		if (rows.length === 0) {
			res.status(404).send(`Leave record with leave_id ${leaveId} not found`);
			return;
		}
		res.json(rows[0]);
	});
});

// API endpoint to create a new leave record
app.post("/api/leave", (req, res) => {
	const {
		personnel_id,
		service_number,
		start_date,
		end_date,
		status,
		reporting_date,
	} = req.body;
	const sql =
		"INSERT INTO `leave` (personnel_id, service_number, start_date, end_date, status, reporting_date) VALUES (?, ?, ?, ?, ?, ?)";

	db.query(
		sql,
		[
			personnel_id,
			service_number,
			start_date,
			end_date,
			status,
			reporting_date,
		],
		(err, result) => {
			if (err) {
				console.error("Error creating leave record:", err);
				res.status(500).send("Error creating leave record");
				return;
			}
			console.log(`New leave record created: ${result.insertId}`);
			res.status(201).send("Leave record created successfully");
		}
	);
});

// API endpoint to update a leave record
app.put("/api/leave/:leaveId", (req, res) => {
	const leaveId = req.params.leaveId;
	const {
		personnel_id,
		service_number,
		start_date,
		end_date,
		status,
		reporting_date,
	} = req.body;
	const sql =
		"UPDATE `leave` SET personnel_id = ?, service_number = ?, start_date = ?, end_date = ?, status = ?, reporting_date = ? WHERE leave_id = ?";

	db.query(
		sql,
		[
			personnel_id,
			service_number,
			start_date,
			end_date,
			status,
			reporting_date,
			leaveId,
		],
		(err, result) => {
			if (err) {
				console.error("Error updating leave record:", err);
				res
					.status(500)
					.send(`Error updating leave record with leave_id ${leaveId}`);
				return;
			}
			console.log(`Leave record with leave_id ${leaveId} updated successfully`);
			res
				.status(200)
				.send(`Leave record with leave_id ${leaveId} updated successfully`);
		}
	);
});

// API endpoint to delete a leave record
app.delete("/api/leave/:leaveId", (req, res) => {
	const leaveId = req.params.leaveId;
	const sql = "DELETE FROM `leave` WHERE leave_id = ?";

	db.query(sql, [leaveId], (err, result) => {
		if (err) {
			console.error("Error deleting leave record:", err);
			res
				.status(500)
				.send(`Error deleting leave record with leave_id ${leaveId}`);
			return;
		}
		console.log(`Leave record with leave_id ${leaveId} deleted successfully`);
		res
			.status(200)
			.send(`Leave record with leave_id ${leaveId} deleted successfully`);
	});
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
