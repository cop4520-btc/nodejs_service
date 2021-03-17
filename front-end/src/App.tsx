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
import { Signup } from "./signup";
import './App.css'




function App()
{
	return (

		
		<main className="main">
			<Router>
				
				<Switch>
					
					<Route exact path = "/"> 
						<Login />
					</Route>		

					<Route exact path = "/register"> 
						<Signup />
					</Route>	
					
			
					
				</Switch>
			</Router>
		</main>
		
	);
}

export default App;
