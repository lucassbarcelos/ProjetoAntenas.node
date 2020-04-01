exports.up = function(knex) {
  return knex.schema.createTable("project", function(table) {
    table.string("id").primary();
    table.string("title").notNullable();
    table.string("quickDescription").notNullable();
    table.string("fullDescription");
    table.string("techDescription");
    table.string("linkOne");
    table.string("linktwo");
    table.int("fase");
    table.int("status");
    table.string("reason");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("project");
};
