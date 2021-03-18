import React from "react";
import { Button, Card } from "react-bootstrap";

import "./TransactionControls.css";

export class TransactionControls extends React.Component{

	render()
	{
		return(
			<div className="transaction-controls" >
				<Card border="secondary" style={{ width: '18rem' }}>
					<Card.Header as="h5">Make a Transaction</Card.Header>
					<Card.Body>
						<Card.Title></Card.Title>
						<Card.Text>
						
						</Card.Text>
						<Button variant="outline-primary">Buy</Button>{' '}
						<Button variant="outline-primary">Sell</Button>{' '}
					</Card.Body>
				</Card>
			</div>
		);
	}

}
