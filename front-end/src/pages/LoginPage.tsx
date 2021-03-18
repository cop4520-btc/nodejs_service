import { useState, FormEvent } from "react";
import { Button, Form, Image } from "react-bootstrap";

// Util imports
import buildpath from "../util/buildpath";

// Common Type imports
import { LoginApiPayload } from "../commonTypes/ApiPayloads";
import ApiRequest from "../commonTypes/ApiRequests";

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

		let request: ApiRequest = {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {"Content-Type": "aplication/json"}
		};
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
							<Form.Control type="text" onChange={changeUsername} />
						</Form.Group>
						<Form.Group controlId="formPassword">
							<Form.Label>Password</Form.Label>
							<br />
							<Form.Control type="password" onChange={changePassword} />
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}
