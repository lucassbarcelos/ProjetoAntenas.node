const express = require("express");
const UserService = require("../services/UserServices");

const routes = express.Router();

routes.post("/register", UserService.create);

routes.get("/select", UserService.index);

routes.post("/logon", UserService.logon);

module.exports = app => app.use("/auth", routes);
