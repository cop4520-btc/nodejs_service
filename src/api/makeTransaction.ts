import { Request, Response } from "express";
import * as request from "request";

// type imports
import { MavenApiOptions } from "../types/mavenTypes";

interface MakeTransactionInput
{
	userID: number,
	amountBTC: number
}

interface MakeTransactionReturn
{
	success: boolean,
	error: string
}

export async function makeTransaction(request: Request, response: Response, next: CallableFunction)
{
	let input: MakeTransactionInput = {
		userID: request.body.userID,
		amountBTC: request.body.amountBTC
	};

	let returnPackage: MakeTransactionReturn = {
		success: false,
		error: ""
	};

	let apiOptions: MavenApiOptions = {
		server: process.env.MAVEN_URI + process.env.MAVEN_PORT
	};
}
