const bcrypt = require("bcrypt");
const passport = require("passport");
const dotenv = require("dotenv");
const { User } = require("../models/User");

dotenv.config();
var userGoogle;
var userFacebook;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

// Google Strategy configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Use the profile information or save it to your database if needed
      userGoogle = profile;
      return done(null, userGoogle);
    }
  )
);

// Facebook Strategy configuration
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Use the profile information or save it to your database if needed
      userFacebook = profile;
      return done(null, userFacebook);
    }
  )
);

class LoginController {
  login(req, res) {
    res.render("login/index", {
      style: "login.css",
      title: "Login",
      script: "login.js",
    });
  }

  async auth(req, res) {
    const { username, password } = req.body;
    try {
      // Check if the user exists in the database
      const result = await User.getOne(username);
      const user = result.rows[0];
      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "Username is not exist" });
      }

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid password" });
      }

      req.session.user = {
        username: user.username,
        role: user.role,
      };

      // Successful login
      return res
        .status(200)
        .json({ success: true, message: "Login successful", role: user.role });
    } catch (error) {
      console.error("Error during login:", error);
      return res
        .status(400)
        .json({ success: false, error: "An error occurred during login" });
    }
  }

  async googleCallBack(req, res) {
    const email = userGoogle.emails[0].value;

    const user = await User.getUserByEmail(email);
    if (user.rowCount == 1 && user.rows[0].password != null) {
      req.session.user = {
        username: user.rows[0].username,
        role: user.rows[0].role,
      };
      return res.redirect("/");
    } else {
      return res.redirect("/login/google-register");
    }
  }

  async googleLogin(req, res) {
    return res.render("login/google-register", {
      style: "login.css",
      title: "Login",
      script: "login.js",
    });
  }

  async registerGoogle(req, res) {
    const { username, password } = req.body;
    const duplicate = await User.checkUserExist(username);

    if (duplicate.rowCount > 0) {
      return res.status(400).json({ error: "Username already exists" });
    } else {
      const first_name = userGoogle.name.givenName;
      const last_name = userGoogle.name.familyName;
      const email = userGoogle.emails[0].value;
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      User.create(
        username,
        hashed,
        first_name,
        last_name,
        null,
        null,
        email,
        null,
        null,
        false
      )
        .then((result) => {
          req.session.user = {
            username: result.rows[0].username,
            role: result.rows[0].role,
          };
          return res.status(200).json({
            message: "You have successfully registered a new account",
          });
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Error registering a new account" });
        });
    }
  }

  // FACEBOOK LOGIN
  async facebookCallBack(req, res) {
    // get user by facebook id
    const user = await User.getUserByFacebookId(userFacebook.id);

    if (user.rowCount == 1) {
      req.session.user = {
        username: user.rows[0].username,
        role: user.rows[0].role,
      };
      return res.redirect("/");
    } else {
      return res.redirect("/login/facebook-register");
    }
  }

  async facebookLogin(req, res) {
    return res.render("login/facebook-register", {
      style: "login.css",
      title: "Login",
      script: "login.js",
    });
  }

  async registerFacebook(req, res) {
    const { username, password } = req.body;
    const duplicate = await User.checkUserExist(username);

    if (duplicate.rowCount > 0) {
      return res.status(400).json({ error: "Username already exists" });
    } else {
      const getLastNameAndFirstName = (fullName) => {
        const names = fullName.split(" ");
        const lastName = names[names.length - 1];
        const firstName = names.slice(0, names.length - 1).join(" ");
        return [lastName, firstName];
      };

      var fullName = userFacebook.displayName;
      var [lastName, firstName] = getLastNameAndFirstName(fullName);

      const first_name = firstName;
      const last_name = lastName;
      const facebook_id = userFacebook.id;
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      console.log(firstName, lastName, facebook_id, hashed)
      User.create(
        username,
        hashed,
        first_name,
        last_name,
        null,
        null,
        null,
        null,
        null,
        false,
        facebook_id
      )
        .then((result) => {
          req.session.user = {
            username: result.rows[0].username,
            role: result.rows[0].role,
          };
          return res.status(200).json({
            message: "You have successfully registered a new account",
          });
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Error registering a new account" });
        });
    }
  }
}
module.exports = new LoginController();
