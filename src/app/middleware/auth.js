const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "No token provided" });

  jwt.verify(authHeader, authConfig.secrect, (error, decode) => {
    if (error) return res.status(401).send({ error: "Invalid token " + error });

    req.userId = decode.id;

    return next();
  });
};
