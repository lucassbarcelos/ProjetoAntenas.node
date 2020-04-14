const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");
const userEnum = require("../utils/userEnum");
const mongo = require("../../database/connection");
const { ProjectType, UserType } = require("../../graphql/types");
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
        fullDescription: {
          type: new GraphQLNonNull(GraphQLString),
        },
        link: {
          type: new GraphQLNonNull(GraphQLString),
        },
        creator: {
          type: new GraphQLNonNull(GraphQLString),
        },
        needPairs: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        // pair: {
        //   type: new GraphQLList(PairType),
        // },
        // imgPath: {
        //   type: new GraphQLList(ImgPathType),
        // },
      },
      resolve(parent, args) {
        let project = new Project({
          title: args.title,
          quickDescription: args.quickDescription,
          fullDescription: args.fullDescription,
          link: args.link,
          creator: args.creator,
          needPairs: args.needPairs,
          // pair: args.pair,
          // imgPath: args.imgPath,
        });
        try {
          project.save();
          let log = new Log({
            user: project.creator,
            projectId: project._id,
            actionEnum: 1,
          });
          log.save();
          User.find({ email: project.creator })
            .exec()
            .then((docs) => {
              console.log(docs[0]._id);
              return docs._id;
            });
          User.findOne({ email: project.creator }, (err, doc) => {
            console.log(doc._id);
          });
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
