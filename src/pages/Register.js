import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [role, setRole] = useState("admin"); // default role to 'admin'
	const [serviceNumber, setServiceNumber] = useState(""); // state for service number
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			console.error("Passwords do not match");
			toast.error("Passwords do not match");
			return;
		}

		try {
			const token = localStorage.getItem("token"); // get the token from localStorage
			const response = await axios.post(
				"http://localhost:5000/users/register",
				{ email, password, role, service_number: serviceNumber }, // include service_number in the request
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response.data);

			// Store login status in localStorage
			localStorage.setItem("isLoggedIn", "true");
			localStorage.setItem("userEmail", email);

			toast.success("Registration successful!");
			setTimeout(() => {
				navigate("/dashboard"); // Navigate to '/dashboard' after successful registration
			}, 2000); // Wait for 2 seconds before navigating
		} catch (error) {
			console.error("Error registering user", error);
			toast.error("Registration failed");
		}
	};

	return (
		<Container className="mt-5">
			<ToastContainer />
			<h2>Register</h2>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword" className="mt-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="formConfirmPassword" className="mt-3">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="formServiceNumber" className="mt-3">
					<Form.Label>Service Number</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Service Number"
						value={serviceNumber}
						onChange={(e) => setServiceNumber(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="formRole" className="mt-3">
					<Form.Label>Role</Form.Label>
					<Form.Control
						as="select"
						value={role}
						onChange={(e) => setRole(e.target.value)}
						required
					>
						<option value="admin">Admin</option>
						<option value="superadmin">SuperAdmin</option>
					</Form.Control>
				</Form.Group>

				<Button variant="primary" type="submit" className="mt-3">
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default Register;
