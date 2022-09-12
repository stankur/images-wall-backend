import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable("images", (table) => {
		table.dropColumn("image_url");
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable("images", (table) => {
		table.string("image_url").notNullable().defaultTo("some_image_url");
	});
}
