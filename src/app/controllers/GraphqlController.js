const HTTP = require("express-graphql");
const auth = require("../middleware/auth");

module.exports = (app) =>
  app.use(
    "/graphql",
    // auth,
    HTTP({
      schema: require("../services/schemaService.js"),
      graphiql: true,
    })
  );
