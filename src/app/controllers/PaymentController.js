const { Order } = require("../models/Order");
const { OrderDetail } = require("../models/OrderDetail");
const { Cart } = require("../models/Cart");
const { User } = require("../models/User");
const { Product } = require("../models/Product");

class PaymentController {
  //  LIST OF ORDER FOR POST MENTHOD

  async list(req, res) {
    try {
      // USER IN SESSION
      const username = req.session.user.username;
      const user = await User.getOne(username);

      // GET CART BY USER ID
      const products = await Cart.getCartByUserId(username);
      const detail = await Cart.countProduct(username);
      return res.render("payment/index", {
        style: "payment.css",
        title: "Payment",
        script: "payment.js",
        user: user.rows[0],
        products: products.rows,
        detail: detail.rows[0],
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to retrieve cart" });
    }
  }

  async save(req, res) {
    const { first_name, last_name, telephone, address } = req.body;
    const username = req.session.user.username;
    // GET TOTLE PRICE
    const cart = await Cart.countProduct(req.session.user.username);
    console.log(cart.rows[0]);
    //  SAVE ORDER
    Order.save(
      address,
      last_name + " " + first_name,
      telephone,
      cart.rows[0].total_price,
      username  
    )
      .then(async (data) => {
        const products = await Cart.getProduct(username);
        for (var i = 0; i < products.rows.length; i++) {
          const orderDetail = {
            order_id: data.rows[0].id,
            pro_id: products.rows[i].proid,
            quantity: products.rows[i].quantity,
            unit_price: products.rows[i].unit_price,
          };
          // SAVE ORDER DETAIL
          await OrderDetail.save(
            orderDetail.order_id,
            orderDetail.pro_id,
            orderDetail.quantity,
            orderDetail.unit_price
          );
          //  GET OLD QUANTITY IN PRODUCT
          const product = await Product.getOne(orderDetail.pro_id);
          //  SET NEW QUANTITY
          const newQuantity =
            parseInt(product.rows[0].quantity) - parseInt(orderDetail.quantity);
          // UPDATE QUANTITY IN PRODUCT
          Product.updateQuantity(newQuantity, orderDetail.pro_id);
          // DELETE CART
          const getCartId = await Cart.getCartId(username);
          Cart.deleteCart(parseInt(getCartId.rows[0].id));
        }
        res.status(200).json({ message: "Order successfully!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Failed to save order" });
      });
  }
}

module.exports = new PaymentController();
