import React, { MouseEvent } from "react";
import { Button, Navbar} from "react-bootstrap";

// CSS imports
import "./NavBar.css";

export class NavigationBar extends React.Component
{
	render()
	{
		function doLogout(event: MouseEvent<HTMLButtonElement>)
		{
			event.preventDefault();

			localStorage.removeItem("user_data");

			window.location.href = "/";
		}

		return (
			<div className="NavbarDiv">
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href="/transactions"><img src={process.env.PUBLIC_URL + "/Bitcoin_logo.svg"} /></Navbar.Brand>
					<Button variant="outline-primary" onClick={doLogout}>Logout</Button>
				</Navbar>
			</div>
		);
	}
}
