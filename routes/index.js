var express = require("express");
var router = express.Router();
const Controller = require("../controllers/controller");
const { check } = require("express-validator");
const passport = require("passport");

/* GET HOMEPAGE. */
router.get("/", Controller.home);

/* GET SIGN UP. */
router.get("/sign-up", Controller.sign_up);

/* POST SIGN UP. */
router.post(
  "/sign-up",
  [
    check("firstname", "First name is too short!")
      .isLength({ min: 2, max: 15 })
      .escape(),
    check("lastname", "Last name is too short!")
      .isLength({ min: 2, max: 15 })
      .escape(),
    check("username", "Username is too short!")
      .isLength({ min: 2, max: 25 })
      .escape(),
    check("email", "Invalid Email").isEmail(),
    check("password", "Password is too short!")
      .isLength({ min: 6, max: 24 })
      .escape(),
    check("confirm_password", "Passwords don't match!")
      .custom((val, { req }) => val === req.body.password)
      .escape(),
    check("secret").isLength({ max: 4 }).escape(),
  ],
  Controller.post_sign_up
);

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
  })
);

router.get("/log-out", Controller.log_out);

router.post("/new-message", Controller.new_message);

module.exports = router;
