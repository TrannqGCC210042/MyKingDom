const express = require("express");
const router = express.Router();
const passport = require("passport");
const loginController = require("../app/controllers/LoginController");

// login
router.get("/", loginController.login);

// login
router.post("/", loginController.auth);

// Google Auth route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Auth callback route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  loginController.googleCallBack
);

// Google Login
router.get("/google-register", loginController.googleLogin);

// Google Login
router.post("/google-register", loginController.registerGoogle);

// Facebook Auth route
router.get(
  "/facebook",
  passport.authenticate("facebook")
);

// Facebook Auth callback route
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  loginController.facebookCallBack
);

// Facebook Login
router.get("/facebook-register", loginController.facebookLogin);

// Facebook Login
router.post("/facebook-register", loginController.registerFacebook);

module.exports = router;
