exports.seed = function(knex, Promise) {
  return knex("users").insert([
    { id: 1, username: "Max", password: "123" },
    { id: 2, username: "Alex", password: "qwerty" },
    { id: 3, username: "Angel", password: "lemon" }
  ]);
};
