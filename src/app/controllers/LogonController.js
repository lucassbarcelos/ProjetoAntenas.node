const express = require("express");
const LogonService = require("../services/LogonService");

const routes = express.Router();

routes.post("/register", LogonService.create);

routes.post("/logon", LogonService.logon);

module.exports = (app) => app.use("/", routes);
