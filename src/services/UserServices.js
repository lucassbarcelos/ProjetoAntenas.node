const connection = require("../database/connection");
const generateId = require("../utils/generateId");

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
  }
};
