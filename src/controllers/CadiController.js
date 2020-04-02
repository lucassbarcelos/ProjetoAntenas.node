const express = require("express");

const routes = express.Router();

function teste(request, response) {
  return response.json({ teste: "goHorse" });
}
routes.get("/teste", teste);

module.exports = routes;
