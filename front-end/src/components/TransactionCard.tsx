import React from "react";
import { Card } from "react-bootstrap";

import "./TransactionCard.css";

export class TransactionCard extends React.Component{

	render()
	{
		return(
			<div className="transaction-card" >
				<Card>
				<Card.Header>Bitcoin Transaction</Card.Header>
				<Card.Body>
					<blockquote className="blockquote mb-0">
					<p>
						{' '}
						<div className="userID">
					userID
				</div>
				<div className="price-BTC">
				 	price BTC
				</div>
				<div className="price-USD">
					price USD				
				</div>{' '}
					</p>
					<footer className="blockquote-footer">
						Completed
					</footer>
					</blockquote>
				</Card.Body>
				</Card>
			</div>
		);
	}

}
