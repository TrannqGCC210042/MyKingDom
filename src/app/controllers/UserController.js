const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const formidable = require("formidable");
class UserController {
  async profile(req, res) {
    try {
      const username = req.session.user.username;
      // DISPLAY A CUSTOMER'S PROFILE
      const user = await User.getOne(username);
      res.render("user/profile", {
        style: "profile.css",
        title: "Profile",
        script: "profile.js",
        user: user.rows[0],
      });
    } catch (error) {
      console.error("Error retrieving products", error);
      res.status(500).json({ error: "Failed to retrieve products" });
    }
  }

  // UPDATE PROFILE
  update(req, res) {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to update profile" });
      }      
      const { firstName, lastName, gender, birthday, telephone, address } =
        fields;

      // check telephone exists in database
      const checkTelephone = await User.checkDuplicatePhone(telephone, req.session.user.username);
      if (checkTelephone.rowCount > 0) { 
        return res.status(400).json({ error: "Telephone already exists" });
      }

      const username = req.session.user.username;
      // UPDATE USER
      User.update(
        firstName,
        lastName,
        birthday,
        gender,
        telephone,
        address,
        username
      )
        .then(() => {
          return res
            .status(200)
            .json({ message: "Update profile successfully" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Failed to update profile" });
        });
    });
  }

  // HISTORY
  async history(req, res) {
    try {
      const username = req.session.user.username;
      // DISPLAY A CUSTOMER'S HISTORY
      const history = await User.getHistory(username, true);
      // GET ORDER ID
      const orderIds = await User.getOrderId(username, true);

      // check "history" has order_id and the order has id. If the same, get all history with this order_id and push it into the products array. Then push all the same ids into the 2nd array name orders and console.log.
      var historyArray = [];
      for (let i = 0; i < orderIds.rows.length; i++) {
        var orders = orderIds.rows[i];
        var products = [];
        for (let j = 0; j < history.rows.length; j++) {
          if (orderIds.rows[i].id === history.rows[j].order_id) {
            products.push(history.rows[j]);
          }
        }
        // push all the same ids and orderIds.rows[i] into the 2nd array
        historyArray.push({ orders, products });
      }

      res.render("user/history", {
        title: "History",
        historyArray: historyArray,
      });
    } catch (error) {
      console.error("Error retrieving products", error);
      res.status(500).json({ error: "Failed to retrieve products" });
    }
  }

  // PURCHASE
  async purchase(req, res) {
    try {
      const username = req.session.user.username;
      // DISPLAY A CUSTOMER'S PURCHASE
      const purchase = await User.getHistory(username, false);
      // GET ORDER ID
      const orderIds = await User.getOrderId(username, false);

      // check "history" has order_id and the order has id. If the same, get all history with this order_id and push it into the products array. Then push all the same ids into the 2nd array name orders and console.log.
      var purchaseArray = [];
      for (let i = 0; i < orderIds.rows.length; i++) {
        var orders = orderIds.rows[i];
        var products = [];
        for (let j = 0; j < purchase.rows.length; j++) {
          if (orderIds.rows[i].id === purchase.rows[j].order_id) {
            products.push(purchase.rows[j]);
          }
        }
        // push all the same ids and orderIds.rows[i] into the 2nd array
        purchaseArray.push({ orders, products });
      }
      res.render("user/purchase", {
        title: "Purchase",
        purchaseArray: purchaseArray,
      });
    } catch (error) {
      console.error("Error retrieving products", error);
      res.status(500).json({ error: "Failed to retrieve products" });
    }
  }

  // CHANGE PASSWORD
  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const username = req.session.user.username;

      // GET USER
      const user = await User.getOne(username);
      // CHECK OLD PASSWORD
      const checkOldPassword = await bcrypt.compare(
        oldPassword,
        user.rows[0].password
      );
      if (checkOldPassword == 0) {
        return res
          .status(400)
          .json({ error: "The old password does not match!" });
      }
      // HASED PASSWORD
      const salt = await bcrypt.genSalt(10);
      const hashedNew = await bcrypt.hash(newPassword, salt);
      // UPDATE PASSWORD
      User.updatePassword(username, hashedNew)
        .then(() => {
          return res
            .status(200)
            .json({ message: "Change password successfully!" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Failed to change password 2" });
        });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to change password" });
    }
  }

  // FORGOT PASSWORD
  async forgotPassword(req, res) {
    try {
      const { username, newPassword } = req.body;
      // HASED PASSWORD
      const salt = await bcrypt.genSalt(10);
      const hashedNew = await bcrypt.hash(newPassword, salt);
      // UPDATE PASSWORD
      User.updatePassword(username, hashedNew)
        .then(() => {
          return res
            .status(200)
            .json({ message: "Change password successfully!" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Failed to change password 2" });
        });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to change password" });
    }
  }
}
module.exports = new UserController();
