exports.up = function(knex) {
  return knex.schema.createTable("user", function(table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.int("isActive").notNullable();
    table.int("type").notNullable();
    table.string("cpf");
    table.string("company");
    table.int("position");

    table.string("projectId");

    table
      .foreign("projectId")
      .references("id")
      .inTable("project");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user");
};
