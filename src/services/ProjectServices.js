const projectModel = require("../models/project");

module.exports = {
  async create(req, res) {
    const newProject = req.body;

    try {
      const project = await projectModel.create(newProject);

      res.send({
        project
      });
    } catch (error) {
      return res
        .status(400)
        .send("Project dont be created, please try again" + error);
    }
  },
  async select(req, res) {
    try {
      const projects = await projectModel.find();
      if (!projects)
        return res.status(401).send({ error: "No projects found" });

      res.send(projects);
    } catch (error) {
      res
        .status(400)
        .send({ error: "Failed to get projects, please try again" });
    }
  }
};
