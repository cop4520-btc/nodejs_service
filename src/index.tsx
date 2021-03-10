import express from 'express';
import * as dotenv from 'dotenv';

// api endpoints
import { login } from "./api/login";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.get('/', (_, res) => {
	res.status(200).send();
});

app.post("/api/login", login);

app.listen(PORT, () => console.log("Running on port " + PORT));
