const { Cart } = require("../models/Cart");

class Authmiddlewares {
  async isAuth(req, res, next) {
    if (req.session.user) {
      const cart = await Cart.countProduct(req.session.user.username);
      console.log(cart.rows[0]);
      res.locals.count = cart.rows[0];
      res.locals.user = req.session.user;
      next();
    } else {
      res.redirect("/login");
    }
  }

  isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role) {
      res.locals.user = req.session.user;
      next();
    } else {
      res.redirect("/login");
    }
  }

  async freedom(req, res, next) {
    if (req.session.user) {
      const cart = await Cart.countProduct(req.session.user.username);
      console.log(cart.rows[0]);
      res.locals.count = cart.rows[0];
      res.locals.user = req.session.user;
      next();
    } else {
      next();
    }
  }
}
module.exports = new Authmiddlewares();
