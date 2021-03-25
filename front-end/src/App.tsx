// React imports

import React from "react";
import {
	Redirect,
	Route,
	BrowserRouter as Router,
	Switch,
} from "react-router-dom";
import { PageNotFound } from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import './App.css'
import RegisterPage from "./pages/RegisterPage";




// Page imports
import { TransactionsPage } from "./pages/TransactionsPage";

function App()
{
	return (
		<main className="main">
			<Router>
				<Switch>
					<Route exact path = "/">
						<LoginPage />
					</Route>
					<Route exact path = "/register">
						<RegisterPage />
					</Route>
					<Route exact path = "/transactions">
						<TransactionsPage />
					</Route>
				</Switch>
			</Router>
		</main>
		
	);
}

export default App;
