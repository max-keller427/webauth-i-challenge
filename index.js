const express = require("express");
const server = require("./api/server.js");

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
