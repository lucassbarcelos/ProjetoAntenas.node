const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType
} = require('graphql')

const ReunionType = new GraphQLObjectType({
  name: 'Reunion',
  fields: {
    place: { type: GraphQLString },
    possibleDate: { type: GraphQLString }
  }
})
const ReunionInput = new GraphQLInputObjectType({
  name: 'ReunionInput',
  fields: {
    place: { type: GraphQLString },
    possibleDate: { type: GraphQLString }
  }
})

const StateType = new GraphQLObjectType({
  name: 'State',
  fields: {
    aproved: { type: GraphQLBoolean },
    reason: { type: GraphQLString }
  }
})
const StateInput = new GraphQLInputObjectType({
  name: 'StateInput',
  fields: () => ({
    aproved: { type: GraphQLBoolean },
    reason: { type: GraphQLString }
  })
})

const MedalType = new GraphQLObjectType({
  name: 'Medal',
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    teacher: { type: GraphQLID },
    student: { type: GraphQLID },
    level: { type: GraphQLInt }
  }
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    type: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    company: { type: GraphQLString },
    cnpj: { type: GraphQLInt },
    position: { type: GraphQLInt },
    medal: { type: GraphQLList(MedalType) }
  }
})

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    quickDescription: { type: GraphQLString },
    fullDescription: { type: GraphQLString },
    techDescription: { type: GraphQLString },
    linkOne: { type: GraphQLString },
    linkTwo: { type: GraphQLString },
    step: { type: GraphQLString },
    reunion: { type: ReunionType },
    state: { type: GraphQLList(StateType) },
    delivery: { type: GraphQLList(GraphQLString) },
    students: { type: GraphQLList(GraphQLString) },
    cadiOwner: { type: GraphQLString },
    teacherOwner: { type: GraphQLString },
    productOwner: { type: GraphQLString }
  }
})

module.exports = {
  UserType,
  ProjectType,
  StateType,
  StateInput,
  ReunionInput,
  MedalType
}
