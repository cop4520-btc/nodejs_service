import React from "react";

import "./TransactionCard.css";

export class TransactionCard extends React.Component{

	render()
	{
		return(
			<div className="transaction-card" >
				<div className="category-name">
					category name 
				</div>
				<div className="userID">
					userID
				</div>
				<div className="price-BTC">
				 	price BTC
				</div>
				<div className="price-USD">
					price USD				
				</div>
			</div>
		);
	}

}
