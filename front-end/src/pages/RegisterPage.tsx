import { useState } from "react";
import { Form, Button, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { RegisterResponse } from "../commonTypes/ApiResponses";
import md5 from "md5";

// Type imports
import { RegisterApiPayload } from "../commonTypes/ApiPayloads";

// CSS imports
import "./RegisterPage.css";
import buildpath from "../util/buildpath";


export default function RegisterPage()
{
	const [message, setMessage] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");

	const doRegister = async (event: any) =>
	{
		event.preventDefault();

		// ensure that both password fields match
		if (password !== confirmPassword)
		{
			setMessage("Passwords do not match");
			return;
		}

		let payload: RegisterApiPayload = {
			username: username,
			password: md5(password),
			firstname: firstname,
			lastname: lastname,
			address: ''
		};

		let request: Object = {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type" : "application/json"
			}
		};

		let response: Response = await fetch(buildpath("/api/register"), request);

		let data: RegisterResponse = await JSON.parse(await response.text());

		if (!data.success)
		{
			setMessage(data.error);
		}
		else
		{
			// redirect user to login screen
			window.location.href = "/";
		}
	}

	const changeUsername = (event: any) =>
	{
		event.preventDefault();

		setUsername(event.target.value);
	}

	const changePassword = (event: any) =>
	{
		event.preventDefault();

		setPassword(event.target.value);
	}

	const changeConfirmPassword = (event: any) =>
	{
		event.preventDefault();

		setConfirmPassword(event.target.value);
	}

	const changeFirstname = (event: any) =>
	{
		event.preventDefault();

		setFirstname(event.target.value);
	}

	const changeLastname = (event: any) =>
	{
		event.preventDefault();

		setLastname(event.target.value);
	}

	return(
		<div className="registerPage">
			<div className="registerBox">
				<div className="logoDiv">
					<Image src={process.env.PUBLIC_URL + "/Bitcoin_logo.svg"} />
				</div>

				<Form onSubmit={doRegister}>
					<div>
						<Form.Group controlId="username">
							<Form.Label className="whiteText">Username</Form.Label>
							<Form.Control className="text-input" type="text" onChange={changeUsername} required={true} />
						</Form.Group>

						<Form.Group controlId="password">
							<Form.Label className="whiteText">Password</Form.Label>
							<Form.Control className="text-input" type="password" onChange={changePassword} required={true} />
						</Form.Group>

						<Form.Group controlId="confirmPassword">
							<Form.Label className="whiteText">Confirm Password</Form.Label>
							<Form.Control className="text-input" type="password" onChange={changeConfirmPassword} required={true} />
						</Form.Group>

						<Form.Group controlId="firstname">
							<Form.Label className="whiteText">Firstname</Form.Label>
							<Form.Control className="text-input" type="text" onChange={changeFirstname} required={true} />
						</Form.Group>

						<Form.Group controlId="lastname">
							<Form.Label className="whiteText">Lastname</Form.Label>
							<Form.Control className="text-input" type="text" onChange={changeLastname} required={true} />
						</Form.Group>
					</div>
					<div className="formCenteredElements">
						<span className="errorMessage">{message}</span>
						<br />
						<Button variant="primary" type="submit">
							Sign up
						</Button>
						<br />
						<br />
						<Link to="/">
							Return to Login
						</Link>
					</div>
				</Form>
			</div>
		</div>
	);
}
