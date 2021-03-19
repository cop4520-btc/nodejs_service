import * as express from "express";
import request, { RequestCallback, Response } from "request";

// type imports
import { MavenApiOptions, MavenPurchaseReturn } from "../types/mavenTypes";

interface MakeTransactionInput
{
	userID: number,
	amountUSD: number
}

interface MakeTransactionReturn
{
	success: boolean,
	error: string
}

export async function makeTransaction(req: express.Request, res: express.Response, next: CallableFunction)
{
	let input: MakeTransactionInput = {
		userID: req.body.userID,
		amountUSD: req.body.amountUSD
	};

	let returnPackage: MakeTransactionReturn = {
		success: false,
		error: ""
	};

	if (process.env.MAVEN_URI === undefined)
	{
		returnPackage.error = "MAVEN_URI not configured in .env";
		res.json(returnPackage);
		res.status(500);
		res.send();
		return;
	}

	if (process.env.MAVEN_PORT === undefined)
	{
		returnPackage.error = "MAVEN_URI not configured in .env";
		res.json(returnPackage);
		res.status(500);
		res.send();
		return;
	}

	let apiOptions: MavenApiOptions = {
		url: process.env.MAVEN_URI + "/purchase:" + process.env.MAVEN_PORT,
		request: "GET",
		json: {
			id: input.userID,
			amount: input.amountUSD
		}
	};

	const mavenUri: string = process.env.MAVEN_URI + process.env.MAVEN_PORT + "/purchase";

	const handleMavenResponse: RequestCallback = (error: any, response: Response, body: any): void =>
	{
		if (error)
		{
			returnPackage.error = error.toString();
			res.json(returnPackage);
			res.status(500);
			res.send();
			return;
		}

		returnPackage.success = true;
		res.json(returnPackage);
		res.status(200);
		res.send();
		return;
	};

	request(mavenUri, apiOptions, handleMavenResponse);
}
