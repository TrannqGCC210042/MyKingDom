const { Product } = require("../models/Product");
const { Branch } = require("../models/Branch");
const { Brand } = require("../models/Brand");
const { Supplier } = require('../models/Supplier');
const formidable = require('formidable');
const mv = require('mv');
const fs = require("fs");

class ProductController {
  async read(req, res) {
    try {
      let products = [];
      if (req.query.search) {
        const name = req.query.search;
        products = await Product.search(name);
      } else {
        // GET ALL PRODUCTS
        products = await Product.getAll();
      }

      const branches = await Branch.getAll();
      const brands = await Brand.getAll();
      const suppliers = await Supplier.getAll();

      return res.render('product/index', {
        title: "Product",
        script: "product.js",
        products: products.rows,
        branches: branches.rows,
        brands: brands.rows,
        suppliers: suppliers.rows,
      })
    } catch (error) {
      console.error("Error retrieving products", error);
      res.status(500).json({ error: "Failed to retrieve products" });
    }
  }

  detail(req, res) {
    try {
      // GET A PRODUCT
      Product.getOne(req.params.id)
        .then((result) => {
          return res.status(200).json({ product: result.rows[0] });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: "Failed to retrieve product" });
        });
    } catch (error) {
      console.error("Error retrieving product", error);
      res.status(500).json({ error: "Failed to retrieve product" });
    }
  }

  create(req, res) {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form", err);
        res.status(500).json({ error: "Failed to create product 1" });
      }

      // Get input fields from form
      const { name, brand, branch, supplier, smallDescription, detailDescription, price, quantity, gender } = fields;
      console.log(name, branch);

      // Get the uploaded file
      const file = files.image;
      const filePath = file.filepath;
      const fileName = file.originalFilename;

      // Move the file to the desired location
      const imageName = Date.now() + fileName
      const destinationPath = `src/public/img/product/${imageName}`;

      mv(filePath, destinationPath, { mkdirp: true }, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error moving the file.' });
        }
        console.log('Add product successfully');
        Product.create(name, smallDescription, detailDescription, price, gender, quantity, imageName, brand, branch, supplier, price)
          .then((result) => {
            return res.status(200).json({ product: result.rows[0] });
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: "Failed to create product" });
          });
      });
    });
  }

  update(req, res) {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form", err);
        res.status(500).json({ error: "Failed to create brand" });
      }

      // get id from url
      const id = req.params.id;
      // Get input fields from form
      const { name, status, smallDescription, detailDescription, price, gender, quantity, brand, branch, supplier } = fields;
      // Get the uploaded file
      const file = files.image;

      Product.getOne(id)
        .then((result) => {
          const product = result.rows[0];
          // Get the old image name
          const image = product.image;
          // Get the old price
          const oldPrice = product.price;
          if (file == undefined) {
            Product.update(id, name, status, smallDescription, detailDescription, price, gender, quantity, image, brand, branch, supplier, oldPrice)
              .then(async () => {
                const product = await Product.getOne(id)
                return res.status(200).json({ product: product.rows[0] });
              })
              .catch((err) => {
                console.error(err);
                return res.status(500).json({ error: "Failed to update product" });
              });
          } else {
            // Unlink the old avatar
            const oldImage = `src/public/img/product/${image}`;
            fs.unlink(oldImage, (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error deleting the old product image.' });
              }
            });

            // Get the uploaded file
            const filePath = file.filepath;
            const fileName = file.originalFilename;

            // Move the file to the desired location
            const imageName = Date.now() + fileName
            const destinationPath = `src/public/img/product/${imageName}`;

            mv(filePath, destinationPath, { mkdirp: true }, (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error moving the file.' });
              }

              Product.update(id, name, status, smallDescription, detailDescription, price, gender, quantity, imageName, brand, branch, supplier, oldPrice)
                .then(async () => {
                  const product = await Product.getOne(id)
                  return res.status(200).json({ product: product.rows[0] });
                })
                .catch(() => {
                  return res.status(500).json({ error: "Failed to create product" });
                });
            });
          }
        })
        .catch(() => {
          return res.status(500).json({ error: "Failed to update product" });
        });
    });
  }

  delete(req, res) {
    try {
      // get id from url
      const id = req.params.id;
      Product.getOne(id)
        .then((result) => {
          // get the old image name
          const product = result.rows[0];
          const image = product.image;
          const oldImage = `src/public/img/product/${image}`;

          // Unlink the old image
          fs.unlink(oldImage, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Error deleting the old product image.' });
            }
          });

          // DELETE A PRODUCT
          Product.delete(id)
            .then(() => {
              return res.status(200).json({ message: "Product deleted successfully" });
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({ error: "Failed to delete product" });
            });
        })
    } catch (error) {
      console.error("Error deleting product", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  }
}
module.exports = new ProductController();
