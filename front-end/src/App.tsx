// React imports

import {
	Redirect,
	Route,
	BrowserRouter as Router,
	Switch,
} from "react-router-dom";

// Page imports
import { LoginPage } from "./pages/LoginPage";

function App()
{
	return (
		<Router>
			<Switch>
				<Route path="/transactions" exact>
					<LoginPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
