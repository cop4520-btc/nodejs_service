// React imports

import {
	Redirect,
	Route,
	BrowserRouter as Router,
	Switch,
} from "react-router-dom";

// Page imports
import { TransactionsPage } from "./pages/TransactionsPage";

function App()
{
	return (
		<Router>
			<Switch>
				<Route path="/transactions" exact>
					<TransactionsPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
