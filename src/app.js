const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserModel = require("./models/user");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

require("./app/controllers/index")(app);

module.exports = app;
