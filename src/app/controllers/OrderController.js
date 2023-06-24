const { Order } = require("../models/Order");
const { OrderDetail } = require("../models/OrderDetail");

class OrderController {
  list(req, res) {
    try {
      // DISPLAY ALL ORDERS
      Order.getAll()
        .then((result) => {
          // return res.status(200).json({ orders: result.rows });
          return res.render("order/index", {
            title: "Order",
            script: "order.js",
            orders: result.rows,
          });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: "Failed to retrieve orders" });
        });
    } catch (error) {
      console.error("Error retrieving orders", error);
      res.status(500).json({ error: "Failed to retrieve orders" });
    }
  }

  detail(req, res) {
    try {
      // DISPLAY ORDER DETAILS
      const id = req.params.id;
      OrderDetail.getAll(id)
        .then((result) => {
          // return res.status(200).json({ order: result.rows });
          return res.render("order/detail", {
            title: "Order",
            orderDetails: result.rows,
          });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: "Failed to retrieve order" });
        });
    } catch (error) {
      console.error("Error retrieving order", error);
      res.status(500).json({ error: "Failed to retrieve order" });
    }
  }

  confirm(req, res) {
    try {
      // CONFIRM ORDER
      const id = req.params.id;
      Order.confirm(id)
        .then(() => {
          return res.status(200).json({ message: "Order confirmed" });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: "Failed to confirm order" });
        });
    } catch (error) {
      console.error("Error confirming order", error);
      res.status(500).json({ error: "Failed to confirm order" });
    }
  }
}

module.exports = new OrderController();
