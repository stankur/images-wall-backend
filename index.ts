import express, {
	ErrorRequestHandler,
	Express,
	Request,
	Response,
} from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import apiRouter from "./routes/api";
import Debug, { Debugger } from "debug";
const debug: Debugger = Debug("");

dotenv.config({ path: "./.env" });

const app: Express = express();
const port = process.env.PORT;

console.log("in index ts: " + Object.keys(process.env))

app.use(cors());

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.use("/api", apiRouter);

app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({ error: { message: err.message } });
} as ErrorRequestHandler);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
