const User = require("../models/user");
const Comment = require("../models/comment");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.home = (req, res, next) => {
  Comment.find()
    .populate("user")
    .then((comments) => {
      res.render("index", {
        user: req.user,
        message: req.flash("error"),
        comments: comments.reverse(),
      });
    });
};

exports.sign_up = (req, res, next) => res.render("sign-up");

exports.post_sign_up = (req, res, next) => {
  const { firstname, lastname, username, email, password, secret } = req.body;

  const member = secret === process.env.MEMBER_CODE;
  const admin = secret === process.env.ADMIN_CODE;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render("sign-up", { errors: errors.errors });
    return;
  }

  User.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  }).then((user) => {
    if (user) {
      let error = {};
      if (user.username === username) {
        error.msg = "User Name already exists";
      } else {
        error.msg = "Email already exists";
      }
      res.render("sign-up", { errors: [error] });
      return;
    } else {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        const newUser = new User({
          firstname,
          lastname,
          email,
          username,
          password: hashedPassword,
          member: member || admin,
          admin: admin,
        });
        newUser.save((err) => {
          req.login(newUser, (err) => {
            if (err) return next(err);
            return res.redirect("/");
          });
        });
      });
    }
  });
};

exports.log_out = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

exports.new_message = (req, res, next) => {
  const newComment = new Comment({
    text: req.body.comment,
    user: req.user.id,
  });

  newComment.save((err) => {
    if (err) return err;
    return res.redirect("/");
  });
};
