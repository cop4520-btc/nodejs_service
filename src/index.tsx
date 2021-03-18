import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";

// api endpoints
import { getTransactions } from "./api/getTransactions";
import { login } from "./api/login";
import { makeTransaction } from "./api/makeTransaction";
import { register } from "./api/register";
import { updateUser } from "./api/updateUser";

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

// Access Control Logic
app.use((request: Request, response: Response, next: CallableFunction) => 
{
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-requestuested-With, Content-Type, Accept, Authorization'
  );
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
}); 

app.get('/', (_, res) => {
	res.status(200).send();
});

app.post("/api/getTransactions", getTransactions);
app.post("/api/login", login);
app.post("/api/makeTransaction", makeTransaction);
app.post("/api/register", register);
app.post("/api/updateUser", updateUser);

app.listen(PORT, () => console.log("Running on port " + PORT));
