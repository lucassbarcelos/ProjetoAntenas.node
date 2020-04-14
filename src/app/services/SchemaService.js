const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLInputObjectType,
} = require("graphql");
const userEnum = require("../utils/userEnum");
const { ProjectType, UserType, StateInput } = require("../../graphql/types");
const User = require("../../models/user");
const Project = require("../../models/project");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      args: {
        type: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return User.find({ type: args.type });
      },
    },
    ProjectsByOwner: {
      type: new GraphQLList(ProjectType),
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        type: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        switch (args.type) {
          case 1:
            return Project.find({ productOwner: args.email });
          case 2:
            return Project.find({ cadiOwner: args.email });
          case 3:
            return Project.find({ studentOwner: args.email });
          case 4:
            return Project.find({ teacherOwner: args.email });
        }
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
        },
        quickDescription: {
          type: new GraphQLNonNull(GraphQLString),
        },
        productOwner: {
          type: new GraphQLNonNull(GraphQLString),
        },
        linkOne: {
          type: new GraphQLNonNull(GraphQLString),
        },
        state: { type: StateInput },
        step: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve(parent, args) {
        let project = new Project({
          title: args.title,
          quickDescription: args.quickDescription,
          fullDescription: args.fullDescription,
          productOwner: args.productOwner,
          linkOne: args.linkOne,
          state: args.state,
          step: args.step,
        });
        try {
          project.save();
          return project;
        } catch (error) {
          return Response.status(400).send({
            error: "Something Failed" + error,
          });
        }
      },
    },
    mathProject: {
      type: ProjectType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        User.findOne({ email: args.email }, (err, doc) => {
          Project.findOneAndUpdate(
            { _id: args._id },
            { pair: { id: doc._id, isAproved: false } },
            (err, doc) => {
              console.log(doc);
            }
          );
          return Project.findOne({ _id: args._id }, (err, doc) => {
            return doc;
          });
        });
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
