import React from "react";

// Component imports
import { NavigationBar } from "../components/NavBar";
import { TransactionCard } from "../components/TransactionCard";
import { TransactionControls } from "../components/TransactionControls";
import { Wallet } from "../components/Wallet";

import "./TransactionsPage.css";

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
				
					<div className="transaction-column">
						<div className="left-side">
							<Wallet />
							<TransactionControls />
						</div>
						<div className="right-side">
							<TransactionCard />
							<TransactionCard />

						</div>

					</div>
				</div>
			</div>
		);
	}
}
