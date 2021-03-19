import * as mysql from "mysql";
import { LoginData, LoginReturnPackage } from "../types/loginTypes";
import { Request, Response } from "express";
import { UsersQueryReturn } from "src/types/queryReturnTypes";

export async function login(request: Request, response: Response, next: CallableFunction): Promise<void>
{
	let returnPackage: LoginReturnPackage = {
		success: false,
		error: "",
		userData: {
			userID: -1,
			username: "",
			firstname: "",
			lastname: "",
			address: "",
			lastUpdate: 0,
			balance: 0.0,
			spent: 0.0
		}
	};

	let wallet;
	 const getAddress = async () => {

		 // Redo if this is correct, maybe change .env 
		//const args = [process.env.BTC_PY];

		const args = ['btc.py']
	  
		const p = new Promise(function (success, nosuccess) {

		  const { spawn } = require("child_process");
		  const pyprog = spawn("python3", args, {
			encoding: "utf-8",
		  });

		  pyprog.stdout.on("data", function (data: string) {
			success(data.toString());
		  });
	  
		  pyprog.stderr.on("data", (data: string) => {
			nosuccess(data.toString());
		  });
		});
		 
			 const newaddress: string | unknown = await p;
			 if (typeof newaddress === 'string') {
				 const parsed = JSON.parse(newaddress)
				 return {
					 WIF: parsed.WIF,
					 address: parsed.address
				 }
		 }
		 
		 throw new Error("Internal Error: btc.py script")

	}
	
	try {
		wallet = await getAddress();
	}
	catch (e) {
		returnPackage.error = e;
		response.json(returnPackage);
		response.status(500);
		response.send();
		return;
		
	}

	let add : string = wallet.address


	// configure mysql connection data
	const connectionData: mysql.ConnectionConfig = {
		host: process.env.RDS_HOSTNAME,
		user: process.env.RDS_USERNAME,
		password: process.env.RDS_PASSWORD,
		port: Number(process.env.RDS_PORT),
		database: "btc"
	};

	

	const connection: mysql.Connection = mysql.createConnection(connectionData);

	try
	{
		connection.connect();
	}
	catch (e)
	{
		returnPackage.error = e;
		response.json(returnPackage);
		response.status(500);
		response.send();
		return;
	}

	// login data received by client
	const loginData: LoginData = {
		username: request.body.username,
		password: request.body.password
	};

	let queryString: string = "SELECT * FROM Users WHERE Users.username='" + loginData.username + "'";
	queryString = queryString.concat(" AND Users.password='" + loginData.password + "';")

	// query the database for the Users with matching credentials
	try
	{
		connection.query(queryString, (error: string, rows: Array<Object>) => {
			if (error)
			{
				connection.end();
				returnPackage.error = error;
				response.json(returnPackage);
				response.status(500);
				response.send();
				return;
			}

			// return with error if no user was found
			if (rows.length < 1)
			{
				connection.end();
				returnPackage.error = "Username or Password incorrect";
				response.json(returnPackage);
				response.status(400);
				response.send();
				return;
			}

			let userData: UsersQueryReturn = JSON.parse(JSON.stringify(rows[0]));

			

		

			//update address each login

			userData.address = add;

			// transfer query data to returnPackage fields
			returnPackage.userData.userID = userData.id;
			returnPackage.userData.username = userData.username;
			returnPackage.userData.firstname = userData.firstname;
			returnPackage.userData.lastname = userData.lastname;
			returnPackage.userData.address = userData.address;
			returnPackage.userData.lastUpdate = userData.lastUpdate;
			returnPackage.userData.balance = userData.balance;
			returnPackage.userData.spent = userData.spent;

			returnPackage.success = true;
			response.json(returnPackage);
			response.status(200);
			response.send();
		});
	}
	catch (e)
	{
		returnPackage.error = e;
		response.json(returnPackage);
		response.status(500);
		response.send();
		connection.end();
		return;
	}

	connection.end();
}

