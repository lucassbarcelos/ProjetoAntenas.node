const express = require("express");
const UserService = require("../services/UserServices");

const routes = express.Router();

routes.post("/create", UserService.create);

routes.get("/select", UserService.index);

module.exports = routes;
