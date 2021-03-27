import React from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { MakeTransactionResponse } from "../commonTypes/ApiResponses";
import { MakeTransactionApiPayload } from "../commonTypes/ApiPayloads";

import "./TransactionControls.css";
import { UserDataWithoutPassword } from "../commonTypes/UserTypes";
import buildpath from "../util/buildpath";

export class TransactionControls extends React.Component{

	render()
	{
		let buyAmount: number = 0.0;
		let sellAmount: number = 0.0;

		const doBuy = async (event: any) =>
		{
			event.preventDefault();

			if (buyAmount <= 0)
			{
				return;
			}

			let rawUserData : string | null = localStorage.getItem("user_data");
			if (rawUserData === null) 
			{
				console.log("No user logged in");
				return;
			}

			let userData: UserDataWithoutPassword = JSON.parse(rawUserData);

			let payload: MakeTransactionApiPayload = {
				userID: userData.userID, 
				amountUSD: buyAmount
			};

			fetch(
				buildpath("/api/makeTransaction"),
				{
					method: "POST", 
					body: JSON.stringify(payload),
					headers: {
						"Content-Type" : "application/json"
					}
				}
			).finally(() => window.location.reload());

		}

		const changeBuyAmount = (event: any) =>
		{
			event.preventDefault();
			buyAmount = event.target.value;
		}

		const changeSellAmount = (event: any) =>
		{
			event.preventDefault();
			sellAmount = event.target.value;
		}

		return(
			<div className="transaction-controls" >
				<Card border="secondary" style={{ width: '18rem' }}>
					<Card.Header as="h5">Make a Transaction</Card.Header>
					<Card.Body>
						<Card.Title></Card.Title>
						<Card.Text>
						
						</Card.Text>
						<Button variant="outline-primary" onClick={doBuy}>Buy</Button>
						<InputGroup className="mb-3">
							<FormControl
							aria-label="Default"
							aria-describedby="inputGroup-sizing-default"
							onChange={changeBuyAmount}
							/>
						</InputGroup>
						<Button variant="outline-primary">Sell</Button>
						<InputGroup className="mb-3">
							<FormControl
							aria-label="Default"
							aria-describedby="inputGroup-sizing-default"
							onChange={changeSellAmount}
							/>
						</InputGroup>
					</Card.Body>
				</Card>
			</div>
		);
	}

}
