const express = require("express");
const UserService = require("../services/UserServices");
const jwt = require("jsonwebtoken");

const routes = express.Router();

routes.post("/register", UserService.create);

routes.get("/select", UserService.index);

routes.post("/logon", UserService.logon);

routes.get("/auth", UserService.teste);

module.exports = routes;
