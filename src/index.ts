import express from 'express';
import * as dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (_, res) => {
	res.status(200).send();
});

app.listen(PORT, () => console.log("Running on port " + PORT));
