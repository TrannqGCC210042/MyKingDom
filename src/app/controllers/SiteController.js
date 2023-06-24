const e = require("express");
const { Product } = require("../models/Product");
const { Branch } = require("../models/Branch");
const { Brand } = require("../models/Brand");
const { Supplier } = require("../models/Supplier");
const { Contact } = require("../models/Contact");

class SiteController {
  //[GET] /
  async home(req, res) {
    try {
      // DISPLAY 6 THE BEST DICOUNT PRODUCTS IN HOME PAGE
      const productDiscount = await Product.displayProductDiscountOnHomePage();
      // DISPLAY THREE HIGHEST SELLING PRODUCTS IN THE STORE OF THE MONTH
      const bestSelling = await Product.displayProductBestSellerOnHomePage();
      // DISPLAY ALL BRANDS
      const brand = await Brand.getBrand();

      return res.render("home", {
        style: "home.css",
        title: "Homepage",
        productDiscounts: productDiscount.rows,
        bestSellings: bestSelling.rows,
        brands: brand.rows,
        searchValue : "Search"
      });
    } catch (error) {
      console.error("Error retrieving products", error);
      res.status(500).json({ error: "Failed to retrieve products" });
    }
  }

  async shop(req, res) {
    try {
      // DISPLAY ALL BRANCHES
      const branches = await Branch.getAll();
      // DISPLAY ALL BRANDS
      const brands = await Brand.getAll();
      // DISPLAY ALL SUPPLIERS
      const suppliers = await Supplier.getAll();

      var products = await Product.displayAllProductsOnShopPage();
      var titleProduct = "All Products";
      var searchValue = "Search";
      if (products.rowCount == 0) titleProduct = "Product empty!";
      var price = "0";

      if (req.query.search) {
        // UPPER search
        const search = req.query.search.toUpperCase();
        // SEARCH
        products = await Product.search(search);
        titleProduct = 'Result for  "' + req.query.search + '"';
        searchValue = req.query.search;
      } else if (req.query.sort_by) {
        var value = req.query.order;

        if (req.query.sort_by == "name") {
          // DISPLAY ALL PRODUCTS BY NAME OR DESCENDING
          if (req.query.order == "ASC") {
            products = await Product.displayProductByNameAToZOnShopPage();
            titleProduct = "Result for A -> Z";
          } else {
            // DISPLAY ALL PRODUCTS BY NAME DESCENDING OR DESCENDING
            products = await Product.displayProductByNameZToAOnShopPage();
            titleProduct = "Result for Z -> A";
          }
        } else if (req.query.sort_by == "price") {
          // DISPLAY ALL PRODUCTS BY PRICE ASCENDING OR DESCENDING
          if (req.query.price) {
            // SORT BY PRICE
            price = req.query.price;
            products = await Product.displayProductByPriceOnShopPage(price);
            titleProduct = 'Result for Price " under ' + price + '"';
          } else {
            if (req.query.order == "ASC") {
              products =
                await Product.displayProductByPriceAscendingOnShopPage();
              titleProduct = "Result for Low -> High";
            } else {
              // DISPLAY ALL PRODUCTS BY PRICE DESCENDING OR DESCENDING
              products =
                await Product.displayProductByPriceDescendingOnShopPage();
              titleProduct = "Result for High -> Low";
            }
          }
        } else if (req.query.sort_by == "brand") {
          // DISPLAY ALL PRODUCTS BY BRAND IN SHOP PAGE
          products = await Product.displayProductByBrandOnShopPage(value);
          if(products.rowCount > 0) titleProduct = 'Result for "' +  products.rows[0].brand_name + '"';
          else {
            // GET BRAND NAME 
            const brand = await Brand.getOne(value);
            titleProduct = 'No result for "' + brand.rows[0].name + '"'
          };
        } else if (req.query.sort_by == "supplier") {
          // DISPLAY ALL PRODUCTS BY SUPPLIER IN SHOP PAGE
          products = await Product.displayProductBySupplierOnShopPage(value);
          if(products.rowCount > 0) titleProduct = 'Result for "' +  products.rows[0].supplier_name + '"';
          else {
            // GET SUPPLIER NAME 
            const supplier = await Supplier.getOne(value);
            titleProduct = 'No result for "' + supplier.rows[0].name + '"'
          };
        } else if (req.query.sort_by == "gender") {
          // DISPLAY ALL PRODUCTS BY GENDER IN SHOP PAGE
          products = await Product.displayProductByGenderOnShopPage(value);
          if(products.rowCount > 0) titleProduct = 'Result for "' +  value + '"';
          else titleProduct = 'No result for "' +  value + '"';
        }
      }

      return res.render("site/shop", {
        style: "shop.css",
        script: "shop.js",
        title: "Shop",
        titleProduct: titleProduct,
        searchValue: searchValue,
        value: price,
        products: products.rows,
        branches: branches.rows,
        brands: brands.rows,
        suppliers: suppliers.rows,
      });
    } catch (error) {
      console.error("Error retrieving products", error);
      res.status(500).json({ error: "Failed to retrieve products" });
    }
  }

  async detail(req, res) {
    // GET A PRODUCT BY ID
    try {
      const id = req.params.id;

      var product = await Product.displayProductOnDetailPage(id);
      var suggest = await Product.displayProductSuggestDetailPage(
        product.rows[0].supplier_id,
        product.rows[0].branch_id,
        product.rows[0].brand_id,
        product.rows[0].id
      );

      res.render("site/detail", {
        style: "detail.css",
        title: "detail",
        script: "detail.js",
        titleProduct: "Product",
        product: product.rows[0],
        productSuggest: suggest.rows,
      });
    } catch (error) {
      console.error("Error retrieving product", error);
      res.status(500).json({ error: "Failed to retrieve product" });
    }
  }

  about(req, res) {
    res.render("site/about", {
      style: "about.css",
      title: "About",
      searchValue: "Search",
    });
  }

  contact(req, res) {
    res.render("site/contact", {
      style: "contact.css",
      title: "Contact",
      script: "contact.js",
      searchValue: "Search",
    });
  }

  saveContact(req, res) {
    try {
      // GET DATA FROM CONTACT FORM AJAX
      const { name, email, subject, message } = req.body;
      // SAVE DATA TO DATABASE
      Contact.save(name, email, subject, message);
      res.status(200).json({ message: "Your contact has been sent" });
    } catch (error) {
      console.error("Error saving contact", error);
      res.status(500).json({ error: "Failed to save contact" });
    }
  }

  order(req, res) {
    res.render("site/order", {
      style: "order.css",
      title: "order",
    });
  }

  logout(req, res) {
    if (req.session.user) {
      req.session.destroy();
      res.redirect("/");
    } else {
      res.render("login/index", {
        title: "Login",
        script: "login.js",
        style: "login.css",
      });
    }
  }
}

module.exports = new SiteController();
