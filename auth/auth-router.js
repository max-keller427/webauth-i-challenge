const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json(`Welcome ${user.username}`);
      } else {
        res
          .status(401)
          .json({ message: "The credentials provided cannot be verified" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/logout", restricted, (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json(err);
      }
      res.end();
    });
  } else {
    res.end();
  }
});

module.exports = router;
