const mongoose = require("../database/connection");

const MedalSchema = new mongoose.Schema({
  tecnology: {
    type: String,
    required: true,
  },
  type: String,
  description: String,
});

const Medal = mongoose.model("medal", MedalSchema);

module.exports = Medal;
