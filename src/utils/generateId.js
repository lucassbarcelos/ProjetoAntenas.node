const crypto = require("crypto");

module.exports = function generateId() {
  return crypto.randomBytes(4).toString("HEX");
};
