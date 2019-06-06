exports.up = function(knex) {
  return knex.schema.createTable("users", function(tbl) {
    tbl.increments();
    tbl
      .string("username", 25)
      .notNullable()
      .unique();
    tbl.string("password").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
