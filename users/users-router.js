const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require('../data/knexConfig.js')

const Users = require("../users/users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/users", (req, res) => {
  db("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
