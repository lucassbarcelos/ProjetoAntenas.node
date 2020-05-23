const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLInputObjectType,
} = require("graphql");
const {
  ProjectType,
  UserType,
  StateInput,
  ReunionInput,
  MedalType,
} = require("../../graphql/types");
const User = require("../../models/user");
const Project = require("../../models/project");
const Medal = require("../../models/medal");

const RootQuery = new GraphQLObjectType({
  name: "Querys",
  description: "Here are all queries you can do using GraphQL",
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
    medals: {
      type: new GraphQLList(MedalType),
      resolve(parent, args) {
        return Medal.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutations",
  description:
    "Here are how to use and what are expected for do projects mutations",
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
    updateProject: {
      type: ProjectType,
      description: "you can update everything in project",
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        quickDescription: { type: GraphQLString },
        fullDescription: { type: GraphQLString },
        techDescription: { type: GraphQLString },
        linkOne: { type: GraphQLString },
        linkTwo: { type: GraphQLString },
        step: { type: GraphQLString },
        reunion: { type: GraphQLList(ReunionInput) },
        state: { type: GraphQLList(StateInput) },
        delivery: { type: GraphQLList(GraphQLString) },
        students: { type: GraphQLList(GraphQLString) },
        cadiOwner: { type: GraphQLString },
        teacherOwner: { type: GraphQLString },
        productOwner: { type: GraphQLString },
      },
      resolve(parent, args) {
        const res = Project.updateOne({ _id: args._id }, args, (err, doc) => {
          return doc;
        });
        return Project.findOne({ _id: args._id }, (erro, doc) => {
          return doc;
        });
      },
    },
    createMedal: {
      type: MedalType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
        },
        type: {
          type: new GraphQLNonNull(GraphQLString),
        },
        description: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        console.log(args);
        let medal = new Medal({
          title: args.title,
          type: args.type,
          description: args.description,
        });
        try {
          medal.save();
          return medal;
        } catch (error) {
          return Response.status(400).send({
            error: "Something Failed" + error,
          });
        }
      },
    },
    giveMedal: {
      type: MedalType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLString),
        },
        teacher: {
          type: new GraphQLNonNull(GraphQLString),
        },
        student: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        console.log(args);
        let medal = new Medal({
          title: args.title,
          type: args.type,
          description: args.description,
        });
        try {
          const res = User.updateOne(
            { _id: medal.student },
            medal,
            (err, doc) => {
              return doc;
            }
          );
          return User.findOne({ _id: medal.student }, (erro, doc) => {
            return doc;
          });
        } catch (error) {
          return Response.status(400).send({
            error: "Something Failed" + error,
          });
        }
      },
    },
  },
});
module.exports = new GraphQLSchema({
  description:
    "Here are all the queries and mutations you can do to get what you need",
  query: RootQuery,
  mutation: Mutation,
});
