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
						Todo: Implement transactions page
					</Route>
				</Switch>
			</Router>
		</main>
		
	);
}

export default App;
