const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserModel = require("./models/user");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

require("./app/controllers/index")(app);

module.exports = app;
