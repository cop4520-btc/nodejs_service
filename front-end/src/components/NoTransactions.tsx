import React from "react";
import { Badge } from "react-bootstrap";

export default function NoTransactions()
{
	return (
		<div>	
			<h4 className="no-transaction">
				<Badge variant="secondary">No transactions to show</Badge>{' '}
			</h4>		
		</div>
	);
}
