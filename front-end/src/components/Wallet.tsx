import React from "react";

import "./Wallet.css";

export class Wallet extends React.Component{

	render()
	{
		return(
			<div className="wallet">
				<div className="username">
					Username
				</div>
				<div className="balance">
					Balance
				</div>
			</div>
		);
	}

}
