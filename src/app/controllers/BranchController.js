const { Branch } = require("../models/Branch");
class BranchController {
  async read(req, res) {
    try {
      let branchs = [];
      if (req.query.search) {
        const name = req.query.search;
        branchs = await Branch.search(name)
      } else {
        branchs = await Branch.getAll()
      }
      return res.render("branch/index", {
        title: "Branch",
        script: "branch.js",
        branches: branchs.rows,
      });
    } catch (error) {
      console.error("Error retrieving branches", error);
      res.status(500).json({ error: "Failed to retrieve branches" });
    }
  }

  detail(req, res) {
    try {
      // GET A BRANCH
      Branch.getOne(req.params.id)
        .then((result) => {
          return res.status(200).json({ branch: result.rows[0] });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: "Failed to retrieve branch" });
        });
    } catch (error) {
      console.error("Error retrieving branch", error);
      res.status(500).json({ error: "Failed to retrieve branch" });
    }
  }

  create(req, res) {
    try {
      // GET DATA FROM req.body
      const { name, address, phone } = req.body;
      // CREATE A BRANCH
      Branch.create(name, phone, address)
        .then((result) => {
          return res.status(200).json({ branch: result.rows[0] });
        })
        .catch((err) => {
          console.error("Error creating branch", err)
          return res.status(500).json({ error: "Failed to create branch" });
        });
    } catch (error) {
      console.error("Error creating branch", error);
      res.status(500).json({ error: "Failed to create branch" });
    }
  }

  update(req, res) {
    try {
      // GET DATA FROM req.body
      const id = req.params.id;
      const { name, phone, address } = req.body;

      // UPDATE A BRANCH
      Branch.update(id, name, phone, address)
        .then((result) => {
          return res.status(200).json({ branch: result.rows[0] });
        })
        .catch((err) => {
          console.error("Error updating branch", err);
          return res.status(500).json({ error: "Failed to update branch" });
        });
    } catch (error) {
      console.error("Error updating branch", error);
      res.status(500).json({ error: "Failed to update branch" });
    }
  }

  delete(req, res) {
    try {
      // DELETE A BRANCH
      Branch.delete(req.params.id)
        .then(() => {
          return res.status(200).json({ message: "Branch deleted successfully" });
        })
        .catch((err) => {
          return res.status(500).json({ error: "Failed to delete branch" });
        });
    } catch (error) {
      console.error("Error deleting branch", error);
      res.status(500).json({ error: "Failed to delete branch" });
    }
  }
}

module.exports = new BranchController();
