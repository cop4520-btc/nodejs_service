import { Form, Button } from 'react-bootstrap';

import "./signup.css";


function doSignup(){
	
}

export function Signup(){
	return(
		<div className="signup-box">
			<Form onSubmit={doSignup}>
				
				<Form.Group controlId="formBasicFirstName">
					<Form.Label>First name</Form.Label>
					<Form.Control className="text-input" type="First name" placeholder="Enter first name" required={true}/>
				</Form.Group>

				<Form.Group controlId="formBasicLastName">
					<Form.Label>Last name</Form.Label>
					<Form.Control className="text-input" type="Last name" placeholder="Enter last name" required={true}/>
				</Form.Group>

				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control className="text-input" type="Username" placeholder="Enter Username" required={true}/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control className="text-input" type="password" placeholder="Password" required={true}/>
				</Form.Group>
			
				<Button variant="primary" type="submit">
					Sign up
				</Button>
			</Form>
		</div>
	);
}
