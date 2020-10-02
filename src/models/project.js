const mongoose = require('../database/connection')

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
  step: Number,
  reunion: {
    possibleDate: String,
    place: String,
    type: Object
  },
  state: {
    aproved: Boolean,
    reason: String,
    type: Object
  },
  delivery: { Array },
  students: Array,
  cadiOwner: String,
  teacherOwner: String,
  productOwner: String
})

const Project = mongoose.model('project', ProjectSchema)

module.exports = Project
