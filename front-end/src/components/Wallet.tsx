import React from "react";
import { Card } from "react-bootstrap";

import "./Wallet.css";

export class Wallet extends React.Component{

	render()
	{
		return(
			<div className="wallet">
				<Card border="secondary" style={{ width: '18rem' }}>
    				<Card.Header>Your Wallet</Card.Header>
					<Card.Body>
					<Card.Title>Username</Card.Title>
					<Card.Text>
						Balance
					</Card.Text>
					</Card.Body>
  				</Card>
 				 <br />
			</div>
		);
	}

}
