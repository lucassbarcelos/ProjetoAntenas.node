const HTTP = require("express-graphql");
const auth = require("../middleware/auth");

module.exports = (app) =>
  app.use(
    "/graphql",
    HTTP({
      schema: require("../services/SchemaService"),
      graphiql: true,
    })
  );
