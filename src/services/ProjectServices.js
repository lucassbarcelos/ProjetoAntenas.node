const projectModel = require("../models/project");

module.exports = {
  async create(req, res) {
    const newProject = req.body;

    try {
      console.log(newProject);
      const project = await projectModel.create(newProject);

      res.send({
        project
      });
    } catch (error) {
      return res
        .status(400)
        .send("Project dont be created, please try again" + error);
    }
  }
};
