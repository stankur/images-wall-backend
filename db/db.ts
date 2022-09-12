import knex from "knex";
import config from "./knexfile";
import dotenv from "dotenv"

dotenv.config({ path: "./.env" });

console.log("in db ts: " + Object.keys(process.env));

export default knex(config[process.env.NODE_ENV || "development"]);
