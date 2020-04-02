const connection = require("../database/connection");
const generateId = require("../utils/generateId");
const jwt = require("jsonwebtoken");

module.exports = {
  async create(request, response) {
    const {
      name,
      email,
      password,
      type,
      cpf,
      company,
      position
    } = request.body;

    const id = generateId();
    const isActive = 0;

    await connection("user").insert({
      id,
      name,
      email,
      password,
      type,
      cpf,
      company,
      position,
      isActive
    });

    return response.json({
      id
    });
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
