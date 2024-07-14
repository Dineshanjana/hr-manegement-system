const jwt = require("jsonwebtoken");

const isSuperAdmin = (req, res, next) => {
	const authHeader = req.header("Authorization");
	if (!authHeader) {
		return res.status(401).send({ error: "No authorization token provided" });
	}

	const token = authHeader.replace("Bearer ", "");
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		if (decoded.role !== "superadmin") {
			return res
				.status(403)
				.json({ message: "Access denied: Superadmin only" });
		}
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).send({ error: "Invalid token or please authenticate." });
	}
};

module.exports = isSuperAdmin;
