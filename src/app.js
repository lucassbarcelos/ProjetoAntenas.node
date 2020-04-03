const express = require("express");
const cors = require("cors");
const cadiController = require("./controllers/cadiController");
const userController = require("./controllers/userController");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use(cadiController);
app.use(userController);
// app.use(routes);
// app.use(errors());

module.exports = app;
