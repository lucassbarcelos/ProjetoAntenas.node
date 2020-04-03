// const connection = require("../database/connection");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/auth");

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
    const users = await User.find();
    return response.json({ users });
  },

  async logon(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select("+password");

      if (!user) return res.status(400).send({ error: "User not found" });

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).send({ error: "Invalid password" });

      user.password = undefined;
      const token = jwt.sign({ id: user._id }, authConfig.secrect, {
        expiresIn: 86400
      });

      return res.json({ user, token });
    } catch (error) {
      return res.status(400).send("Authentication failed " + error);
    }
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
