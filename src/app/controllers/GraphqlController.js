const HTTP = require("express-graphql");
const { NODE_ENV } = process.env;

module.exports = (app) =>
  app.use(
    "/graphql",
    HTTP({
      schema: require("../services/SchemaService"),
      graphiql: NODE_ENV === "development",
    })
  );
