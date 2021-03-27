import React from "react";
import { Card } from "react-bootstrap";

// CSS imports
import "./TransactionCard.css";

// Type imports
import { Transaction } from "../commonTypes/ApiResponses";

export interface TransactionCardProps
{
	id: string,
	transactionData: Transaction
}

export class TransactionCard extends React.Component<TransactionCardProps>
{
	render()
	{
		let username: string = "";
		let rawUserData: string | null = localStorage.getItem("user_data");

		if (rawUserData !== null)
		{
			username = JSON.parse(rawUserData).username;
		}
		else
		{
			username = this.props.transactionData.userID.toString();
		}

		const generateTransactionStatusText = (status: boolean) =>
		{
			if (status)
			{
				return(
					<span className="successfulTransaction">Success</span>
				);
			}
			else
			{
				return(
					<span className="failedTransaction">Success</span>
				);
			}
		}

		return(
			<div className="transaction-card" key={this.props.id} >
				<Card>
					<Card.Header>ID: {this.props.transactionData.transactionID}</Card.Header>
					<Card.Body>
						<blockquote className="blockquote mb-0">
						<p>
							<div className="userID">
								Username: {username}
							</div>
							<div className="price-BTC">
								Price BTC: {this.props.transactionData.priceBTC}
								
							</div>
							<div className="price-USD">
								Price USD: {this.props.transactionData.priceUSD}
							</div>
							<div className="transaction-status">
							Transaction Status: {generateTransactionStatusText(this.props.transactionData.successful)}
							</div>
						</p>
						</blockquote>
					</Card.Body>
				</Card>
			</div>
		);
	}

}
