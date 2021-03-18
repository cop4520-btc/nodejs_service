import React from "react";

// Component imports
import { NavigationBar } from "../components/NavBar";
import { TransactionCard } from "../components/TransactionCard";
import { TransactionControls } from "../components/TransactionControls";
import { Wallet } from "../components/Wallet";
import NoTransactions from "../components/NoTransactions";

// Type imports
import { UserDataWithoutPassword } from "../commonTypes/UserTypes";
import { GetTransactionsResponse, Transaction } from "../commonTypes/ApiResponses";
import { GetTransactionsPayload } from "../commonTypes/ApiPayloads";

import "./TransactionsPage.css";
import buildpath from "../util/buildpath";

interface TransactionsPageProps
{
	// blank until this class needs props
}

async function fechTransactions(): Promise<GetTransactionsResponse>
{
	let rawUserData: string | null = localStorage.getItem("user_data");

	let data: GetTransactionsResponse = {
		success: false,
		error: "No user logged in",
		numTransactions: 0,
		transactions: []
	};

	if (rawUserData === null)
	{
		return data;
	}

	const userData: UserDataWithoutPassword = JSON.parse(rawUserData);

	let payload: GetTransactionsPayload = {
		userID: userData.userID,
		transactionID: null // we want to get all transaction from the user
	};

	let request: Object = {
		method: "POST",
		body: JSON.stringify(payload),
		headers: {
			"Content-Type" : "application/json"
		}
	};

	let response: Response = await fetch(buildpath("/api/getTransactions"), request);

	data = await JSON.parse(await response.text());

	return data;
}

export class TransactionsPage extends React.Component<TransactionsPageProps, GetTransactionsResponse>
{
	state: GetTransactionsResponse = {
		success: true,
		error: "",
		numTransactions: 0,
		transactions: []
	};

	componentDidMount()
	{
		fechTransactions()
			.then((json: GetTransactionsResponse) => this.setState(json));
	}

	render()
	{
		const createTransactionCard = () =>
		{
			let i: number;
			for (i = 0; i < this.state.numTransactions; i++)
			{

			}

			return (
				<TransactionCard />
			);	
		};

		return (
			<div>
				<div>
					<NavigationBar />
				
					<div className="transaction-column">
						<div className="left-side">
							<Wallet />
							<TransactionControls />
						</div>
						<div className="right-side">
							{this.state.numTransactions > 0 ? this.state.transactions.map(createTransactionCard) : <NoTransactions />}
						</div>

					</div>
				</div>
			</div>
		);
	}
}
