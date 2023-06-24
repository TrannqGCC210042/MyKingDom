const { Brand } = require("../models/Brand");
const formidable = require('formidable');
const mv = require('mv');
const fs = require("fs");

class BrandController {
  async read(req, res) {
    try {
      let brands = [];
      // READ ALL BRANDS
      if (req.query.search) {
        const name = req.query.search;
        // SEARCH BRANDS
        brands = await Brand.search(name)
      } else {
        brands = await Brand.getAll()
      }
      res.render('brand/index', {
        title: "Brand",
        script: "brand.js",
        brands: brands.rows,
      });
    } catch (error) {
      console.error("Error retrieving brands", error);
      res.status(500).json({ error: "Failed to retrieve brands" });
    }
  }

  detail(req, res) {
    // READ A BRAND
    try {
      Brand.getOne(req.params.id)
        .then((result) => {
          return res.status(200).json({ brand: result.rows[0] });
        })
        .catch((err) => {
          return res.status(500).json({ error: "Failed to retrieve brand" });
        });
    } catch (error) {
      console.error("Error retrieving brand", error);
      res.status(500).json({ error: "Failed to retrieve brand" });
    }
  }

  create(req, res) {
    // CREATE A BRAND
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form", err);
        res.status(500).json({ error: "Failed to create brand" });
      }

      // Get input fields from form
      const { name } = fields;

      // Get the uploaded file
      const file = files.image;
      const filePath = file.filepath;
      const fileName = file.originalFilename;

      // Move the file to the desired location
      const imageName = Date.now() + fileName
      const destinationPath = `src/public/img/brand/${imageName}`;

      mv(filePath, destinationPath, { mkdirp: true }, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error moving the file.' });
        }

        Brand.create(name, imageName)
          .then((result) => {
            return res.status(200).json({ brand: result.rows[0] });
          })
          .catch((err) => {
            return res.status(500).json({ error: "Failed to create brand" });
          });
      });
    });
  }

  update(req, res) {
    // UPDATE A BRAND
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form", err);
        res.status(500).json({ error: "Failed to create brand" });
      }

      // get id from url
      const id = req.params.id;
      // Get input fields from form
      const { name } = fields;
      // Get the uploaded file
      const file = files.image;

      Brand.getOne(id)
        .then((result) => {
          const brand = result.rows[0];
          // Get the old image name
          const image = brand.image;
          if (file == undefined) {
            Brand.update(id, name, image)
              .then((result) => {
                return res.status(200).json({ brand: result.rows[0] });
              })
              .catch((err) => {
                return res.status(500).json({ error: "Failed to update brand" });
              });
          } else {
            // Unlink the old avatar
            const oldImage = `src/public/img/brand/${image}`;
            fs.unlink(oldImage, (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error deleting the old brand image.' });
              }
            });

            // Get the uploaded file
            const filePath = file.filepath;
            const fileName = file.originalFilename;

            // Move the file to the desired location
            const imageName = Date.now() + fileName
            const destinationPath = `src/public/img/brand/${imageName}`;

            mv(filePath, destinationPath, { mkdirp: true }, (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error moving the file.' });
              }

              Brand.update(id, name, imageName)
                .then((result) => {
                  return res.status(200).json({ brand: result.rows[0] });
                })
                .catch(() => {
                  return res.status(500).json({ error: "Failed to create brand" });
                });
            });
          }
        })
        .catch(() => {
          return res.status(500).json({ error: "Failed to update brand" });
        });
    });
  }

  delete(req, res) {
    // Get id from url
    const id = req.params.id;
    Brand.getOne(id)
      .then((result) => {
        // Get the old image name
        const brand = result.rows[0];
        const image = brand.image;

        // Unlink the old avatar
        const oldImage = `src/public/img/brand/${image}`;
        fs.unlink(oldImage, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error deleting the old brand image.' });
          }
        });

        // Delete the brand
        Brand.delete(id)
          .then(() => {
            return res.status(200).json({ message: "Brand deleted successfully" });
          })
          .catch(() => {
            return res.status(500).json({ error: "Failed to delete brand" });
          });
      })
      .catch(() => {
        return res.status(500).json({ error: "Failed to delete brand" });
      });
  }
}

module.exports = new BrandController();
