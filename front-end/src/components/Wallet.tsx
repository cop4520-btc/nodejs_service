import React from "react";
import { Card } from "react-bootstrap";

import "./Wallet.css";

export class Wallet extends React.Component{

	render()
	{
		let balance: number = 0.0;
		let fetchedBalance: boolean = false;
		let rawUserData: string | null = localStorage.getItem("user_data");

		if (rawUserData !== null)
		{
			balance = JSON.parse(rawUserData).balance;
			fetchedBalance = true;
		}

		const populateBalance = () =>
		{
			if (fetchedBalance)
			{
				return (
					<span className="balance">{balance} BTC</span>
				);
			}
			else
			{
				return (
					<span className="errorMessage">{"Failed to fetch balance"}</span>
				);
			}
		}

		return(
			<div className="transaction-card">
				{/* <div className="walletTitle">
					<h3 className="whiteText">
						Your Wallet
					</h3>
				</div>
				<div className="walletData">
					<span>Balance: {}</span>
				</div> */}
				<Card border="secondary" style={{ width: '18rem' }}>
    				<Card.Header>Your Wallet</Card.Header>
					<Card.Body>
					<Card.Text>
						{populateBalance()}
					</Card.Text>
					</Card.Body>
  				</Card>
 				 <br />
			</div>
		);
	}

}
