const express = require("express");
const session = require("express-session");
const SessionStore = require("connect-session-knex")(session);

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router");

const server = express();

const sessionConfig = {
  name: "hxc sesh",
  secret: "shreddin",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
    secure: false,
    httpOnly: true
  },
  store: new SessionStore({
    knex: require("../data/knexConfig.js"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 60 * 60 * 1000
  })
};

server.use(session(sessionConfig));
server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Api Running!" });
});

module.exports = server;
