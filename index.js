const express = require("express");
const server = express();
const bcrypt = require("bcryptjs");

const db = require("./data/knexConfig.js");
const Users = require("./users/users-model.js");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server Running!" });
});

server.get("/api/users", authorize, (req, res) => {
  db("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/api/register", (req, res) => {
  let user = req.body;
  console.log(Users.add());
  if (!user.username || !user.password) {
    res.status(500).json({ message: "Please include username and password" });
  }

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

server.post("/api/login", (req, res) => {
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

function authorize(req, res, next) {
  const username = req.headers["x-username"];
  const password = req.headers["x-password"];

  if (!username && !password) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res
          .status(401)
          .json({ message: "The credentials provided cannot be verified" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
