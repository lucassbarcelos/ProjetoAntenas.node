// const connection = require("../database/connection");
const User = require("../models/user");
const generateId = require("../utils/generateId");
const jwt = require("jsonwebtoken");

module.exports = {
  async create(req, res) {
    const { email } = req.body;

    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: "User already exists" });
      }
      const user = await User.create(req.body);
      user.password = undefined;
      return res.json({
        user
      });
    } catch (err) {
      return res.status(400).send({ error: "Registration failed" });
    }
  },
  async index(request, response) {
    const users = await connection("user").select("*");
    return response.json({ users });
  },

  async logon(request, response) {
    const { email, password } = request.body;

    const token = jwt.sign(password, "teste");
    return response.json({ token });
  },

  async teste(request, response) {
    const { token } = request.headers;

    const res = jwt.decode(token, "teste");
    if (!res) {
      return response.status(401).json({
        error: "Falha na autenticação no token"
      });
    }

    return response.json({ res });
  }
};
