const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserModel = require("./models/user");
const ExpressGraphQL = require("express-graphql");
const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

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

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      people: {
        type: GraphQLList(UserType),
        resolve: (root, args, context, info) => {
          return UserModel.find().exec();
        },
      },
    },
  }),
});

app.use(
  "/graphql",
  ExpressGraphQL({
    schema: schema,
    graphiql: true,
  })
);
require("./app/controllers/index")(app);

module.exports = app;
