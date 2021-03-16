import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";

// api endpoints
import { login } from "./api/login";
import { register } from "./api/register";
import { updateUser } from "./api/updateUser";

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

app.get('/', (_, res) => {
	res.status(200).send();
});

app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/updateUser", updateUser);

app.listen(PORT, () => console.log("Running on port " + PORT));
