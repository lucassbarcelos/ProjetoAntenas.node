const express = require("express");
const auth = require("../middleware/auth");
const ProjectServices = require("../services/ProjectServices");

const routes = express.Router();
routes.use(auth);

routes.post("/new", ProjectServices.create);

module.exports = app => app.use("/project", routes);
