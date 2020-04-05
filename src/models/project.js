const mongoose = require("../database/connection");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  quickDescription: {
    type: String,
    required: true
  },
  fullDescription: String,
  techDescription: String,
  linkOne: String,
  linkTwo: String,
  fase: Number,
  reunion: {
    data: String,
    time: String,
    place: String,
    possibleDate: Array,
    type: Object
  },
  state: {
    aproved: Boolean,
    reason: String,
    type: Object
  },
  delivery: Array,
  students: Array,
  cadiOwner: String,
  professorOwner: String,
  productOwner: String
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
