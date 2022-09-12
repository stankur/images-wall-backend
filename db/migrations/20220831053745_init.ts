import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("images", function (table) {
		table.specificType(
			"id",
			"integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY"
		);
		table.string("image_url").notNullable();
		table.string("key").notNullable();
		table.timestamps(true, true);
	});
}

export async function down(knex :Knex): Promise<void> {
	return knex.schema.dropTable("images");
}

