import React from "react";

import "./TransactionControls.css";

export class TransactionControls extends React.Component{

	render()
	{
		return(
			<div className="transaction-controls" >
				<button className="buy">
					Buy
				</button>
				<button className="sell">
					Sell
				</button>
			</div>
		);
	}

}
