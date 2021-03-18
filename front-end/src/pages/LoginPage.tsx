import { useState, FormEvent } from "react";
import { Button, Form, Image } from "react-bootstrap";

// Util imports
import buildpath from "../util/buildpath";

// Common Type imports
import { LoginApiPayload } from "../commonTypes/ApiPayloads";
import { LoginResponse } from "../commonTypes/ApiResponses";

// CSS imports
import "./LoginPage.css";

interface LoginData
{
	username: string,
	password: string
}

export default function LoginPage()
{
	const [message, setMessage] = useState("");

	var username: string = "";
	var password: string = "";

	const doLogin = async (event: FormEvent) =>
	{
		event.preventDefault();

		let payload: LoginApiPayload = {
			username: username,
			password: password
		};

		let request: Object = {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type" : "application/json"
			}
		};

		let response: Response = await fetch(
			buildpath("/api/login"),
			request
		);

		let data: LoginResponse = await JSON.parse(await response.text());

		if (!data.success)
		{
			setMessage(data.error);
			return;
		}
	};

	const changeUsername = (event: any) =>
	{
		event.preventDefault();
		username = event.target.value;
	}

	const changePassword = (event: any) =>
	{
		event.preventDefault();
		password = event.target.value;
	}

	return (
		<div>
			<div className="LoginBox">
				<div className="LoginLogo">
					<Image src={process.env.PUBLIC_URL + "/Bitcoin_logo.svg"} alt="Bitcoin logo"/>
				</div>
				<div className="LoginForm">
					<Form onSubmit={doLogin}>
						<Form.Group controlId="formUsername">
							<Form.Label>Username</Form.Label>
							<br />
							<Form.Control type="text" onChange={changeUsername} required={true} />
						</Form.Group>
						<Form.Group controlId="formPassword">
							<Form.Label>Password</Form.Label>
							<br />
							<Form.Control type="password" onChange={changePassword} required={true} />
						</Form.Group>
						<span className="errorMessage">{message}</span>
						<br />
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}
