exports.up = function(knex) {
  return knex.schema.createTable("reunion", function(table) {
    table.datetime("date");
    table.string("place");
    table.int("status");

    table.string("projectId");

    table
      .foreign("projectId")
      .references("id")
      .inTable("project");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("reunion");
};
