exports.up = function(knex) {
  return knex.schema.createTable("delivery", function(table) {
    table.string("studentId").notNullable();
    table.string("linkRepository");
    table.string("linkCloud");
    table.string("comment");

    table.string("projectId");

    table
      .foreign("projectId")
      .references("id")
      .inTable("project");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("delivery");
};
