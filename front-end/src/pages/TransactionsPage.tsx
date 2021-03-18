import React from "react";

// Component imports
import { NavigationBar } from "../components/NavBar";
import { TransactionCard } from "../components/TransactionCard";

export class TransactionsPage extends React.Component
{
	componentDidMount()
	{

	}

	render()
	{
		return (
			<div>
				<div>
					<NavigationBar />
					<TransactionCard />
					<TransactionCard />
				</div>
			</div>
		);
	}
}
