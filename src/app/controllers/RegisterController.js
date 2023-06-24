const bcrypt = require("bcrypt");
const { User } = require("../models/User");

class RegisterController {
  index(req, res) {
    res.render("register/index", {
      title: "Register",
      style: "register.css",
      script: "register.js",
    });
  }

  async save(req, res) {
    try {
      const {
        username,
        password,
        firstName,
        lastName,
        gender,
        birthday,
        email,
        telephone,
        address,
      } = req.body;
      const user = await User.getOne(username);
      // check email exist
      const emailExist = await User.getOneEmail(email);
      // check phone exist
      const phoneExist = await User.getOnePhone(telephone);
      if (user.rowCount == 1) {
        return res.status(400).json({ error: "Username already exists" });
      } 
      else if(emailExist.rowCount == 1){
        return res.status(400).json({ error: "Email already exists" });
      }
      else if(phoneExist.rowCount == 1){
        return res.status(400).json({ error: "Phone already exists" });
      }
      else{
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        User.create(
          username,
          hashed,
          firstName,
          lastName,
          gender,
          birthday,
          email,
          telephone,
          address,
          false
        )
          .then((data) => {
            return res.status(200).json({
              message: "You have successfully registered a new account",
            });
          })
          .catch((err) => {
            console.log(err)
            return res
              .status(500)
              .json({ error: "Error registering a new account" });
          });
      }
    } catch (error) {
      return res.status(500).json({ error: "Error registering a new account" });
    }
  }
}

module.exports = new RegisterController();
