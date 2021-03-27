import React from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";

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
						<InputGroup className="mb-3">
							<FormControl
							aria-label="Default"
							aria-describedby="inputGroup-sizing-default"
							/>
						</InputGroup>
						<Button variant="outline-primary">Sell</Button>{' '}
						<InputGroup className="mb-3">
							<FormControl
							aria-label="Default"
							aria-describedby="inputGroup-sizing-default"
							/>
						</InputGroup>
					</Card.Body>
				</Card>
			</div>
		);
	}

}
