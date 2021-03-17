import React from "react";
import { Button, Nav, Navbar} from "react-bootstrap";

export class NavigationBar extends React.Component
{
	render()
	{
		return (
			<div>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href="/transactions"><img src="../../public/Bitcoin_logo.svg" alt="App Logo" /></Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Button variant="outline-success">Logout</Button>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}
