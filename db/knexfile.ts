import type { Knex } from "knex";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

console.log("in knexfile ts: " + Object.keys(process.env));

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
	development: {
		client: "postgresql",
		connection: {
			host: process.env.DB_HOST as string,
			port: parseInt(process.env.DB_PORT as string) as number,
			database: process.env.DB_NAME as string,
			user: process.env.DB_USER as string,
			password: process.env.DB_PASSWORD as string,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},

	production: {
		client: "postgresql",
		connection: {
			host: process.env.DB_HOST as string,
			port: parseInt(process.env.DB_PORT as string) as number,
			database: process.env.DB_NAME as string,
			user: process.env.DB_USER as string,
			password: process.env.DB_PASSWORD as string,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},
};

export default config;
