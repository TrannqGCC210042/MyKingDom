const { Cart } = require("../models/Cart");

class CartController {
  async cart(req, res) {
    try {
      // GET CART BY USER ID
      // get username from session
      const username = req.session.user.username;
      var cart = await Cart.getCartByUserId(username);
      var total = await Cart.countProduct(username);
      res.render("cart/index", {
        style: "cart.css",
        title: "Cart",
        script: "cart.js",
        cart: cart.rows,
        total: total.rows[0],
      });
    } catch (error) {
      console.error("Error retrieving cart", error);
      res.status(500).json({ error: "Failed to retrieve cart" });
    }
  }

  // SAVE CART
  async save(req, res) {
    try {
      // get username from session
      const username = req.session.user.username;
      const { product_id, quantity } = req.body;

      const isProduct = await Cart.isProductInCart(username, product_id);
      if (isProduct.rows.length > 0) {
        await Cart.updateCart(
          isProduct.rows[0].id,
          parseInt(isProduct.rows[0].count) + parseInt(quantity)
        )
          .then(async() => {
            const count = await Cart.countProduct(username);
            res.status(200).json({ message: "Cart saved", count: count.rows[0].items });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to update cart 1" });
          });
      } else {
        await Cart.save(username, product_id, quantity)
          .then(async() => {
            const count = await Cart.countProduct(username);
            res.status(200).json({ message: "Cart saved", count: count.rows[0].items });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to save cart 1" });
          });
      }
    } catch (error) {
      console.error("Error saving cart", error);
      res.status(500).json({ error: "Failed to save cart 2" });
    }
  }

  // UPDATE CART
  async update(req, res) {
    try {
      const { cart_id, action } = req.body;
      const username = req.session.user.username;
      const productInCart = await Cart.getCartById(cart_id);
      console.log("okla");

      const quantity = productInCart.rows[0].count;
      if (action == "plus") {
        Cart.updateCart(cart_id, quantity + 1)
          .then(async () => {
            console.log("update plus quantity");
            const total = await Cart.countProduct(username);
            console.log(total.rows[0]);
            return res.status(200).json({
              count: quantity + 1,
              price: productInCart.rows[0].price * (quantity + 1),
              total_price: parseFloat(total.rows[0].total_price),
              items: total.rows[0].items,
            });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to update plus quantity" });
          });
      } else if (action == "minus") {
        Cart.updateCart(cart_id, quantity - 1)
          .then(async() => {
            const total = await Cart.countProduct(username);
            return res.status(200).json({
              count: quantity - 1,
              price: productInCart.rows[0].price * (quantity - 1),
              total_price: parseFloat(total.rows[0].total_price),
              items: total.rows[0].items,
            });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to update minus quantity" });
          });
      } else {
        const updateQuantity = req.body.quantity;
        Cart.updateCart(cart_id, updateQuantity)
          .then(async() => {
            const total = await Cart.countProduct(username);
            return res.status(200).json({
              count: updateQuantity,
              price: productInCart.rows[0].price * updateQuantity,
              total_price: parseFloat(total.rows[0].total_price),
              items: total.rows[0].items,
            });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to update change quantity" });
          });
      }
    } catch (error) {
      console.error("Error updating cart", error);
      res.status(500).json({ error: "Failed to update cart 2" });
    }
  }

  // DELETE CART
  async delete(req, res) {
    try {
      // GET CART ID FROM POST METHOD
      const { cart_id } = req.body;
      const username = req.session.user.username;

      await Cart.deleteCart(cart_id)
        .then(async() => {
          var total = await Cart.countProduct(username);
          return res.status(200).json({
            total_price: parseFloat(total.rows[0].total_price),
            items: total.rows[0].items,
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Failed to delete cart 1" });
        });
    } catch (error) {
      console.error("Error deleting cart", error);
      res.status(500).json({ error: "Failed to delete cart 2" });
    }
  }
}
module.exports = new CartController();
