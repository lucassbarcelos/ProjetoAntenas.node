const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType,
} = require("graphql");

const ReunionType = new GraphQLObjectType({
  name: "Reunion",
  fields: {
    date: { type: GraphQLString },
    time: { type: GraphQLString },
    place: { type: GraphQLString },
    possibleDate: { type: GraphQLList(GraphQLString) },
  },
});
const ReunionInput = new GraphQLInputObjectType({
  name: "ReunionInput",
  fields: {
    date: { type: GraphQLString },
    time: { type: GraphQLString },
    place: { type: GraphQLString },
    possibleDate: { type: GraphQLList(GraphQLString) },
  },
});

const StateType = new GraphQLObjectType({
  name: "State",
  fields: {
    aproved: { type: GraphQLBoolean },
    reason: { type: GraphQLString },
  },
});
const StateInput = new GraphQLInputObjectType({
  name: "StateInput",
  fields: () => ({
    aproved: { type: GraphQLBoolean },
    reason: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    type: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    company: { type: GraphQLString },
    cpf: { type: GraphQLInt },
    position: { type: GraphQLInt },
  },
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    quickDescription: { type: GraphQLString },
    fullDescription: { type: GraphQLString },
    techDescription: { type: GraphQLString },
    linkOne: { type: GraphQLString },
    linkTwo: { type: GraphQLString },
    step: { type: GraphQLString },
    reunion: { type: GraphQLList(ReunionType) },
    state: { type: GraphQLList(StateType) },
    delivery: { type: GraphQLList(GraphQLString) },
    students: { type: GraphQLList(GraphQLString) },
    cadiOwner: { type: GraphQLString },
    teacherOwner: { type: GraphQLString },
    productOwner: { type: GraphQLString },
  },
});

module.exports = { UserType, ProjectType, StateType, StateInput, ReunionInput };

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//       name: "Query",
//       fields: {
//         user: {
//           type: GraphQLList(UserType),
//           resolve: (root, args, context, info) => {
//             return UserModel.find().exec();
//           },
//         },
//       },
//     }),
//     mutation: new GraphQLObjectType({
//       name: "Mutation",
//       fields: {
//         user: {
//           type: UserType,
//           args: {
//             name: { type: GraphQLNonNull(GraphQLString) },
//             email: { type: GraphQLNonNull(GraphQLString) },
//             password: { type: GraphQLNonNull(GraphQLString) },
//             type: { type: GraphQLNonNull(GraphQLInt) },
//             isActive: { type: GraphQLNonNull(GraphQLBoolean) },
//             company: { type: GraphQLNonNull(GraphQLString) },
//             cpf: { type: GraphQLNonNull(GraphQLInt) },
//             position: { type: GraphQLNonNull(GraphQLInt) },
//           },
//           resolve: (root, args, context, info) => {
//             var user = new UserModel(args);
//             return user.save();
//           },
//         },
//       },
//     }),
//   });
