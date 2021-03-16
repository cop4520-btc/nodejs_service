// React imports

import React from "react";
import {
	Redirect,
	Route,
	BrowserRouter as Router,
	Switch,
} from "react-router-dom";
import { PageNotFound } from "./Components/PageNotFound";
import Login from "./login";
import './App.css'




function App()
{
	return (

		
		<main className="main">
			<Router>
				
				<Switch>
					
					<Route exact path = "/login"> 
						<Login />
					</Route>		
					
			
					
				</Switch>
			</Router>
		</main>
		
	);
}

export default App;
