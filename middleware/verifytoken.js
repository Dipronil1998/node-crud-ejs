const jwt = require("jsonwebtoken");
const config = require("../config/boostrap");

const verifyToken = (req, res, next) => {
  const token = req.session.token;
  if (token) {
    jwt.verify(token, config.secretKey, (err, user) => {
      if (err) {
        req.flash("error", "Token not valid");
        res.redirect("/");
      }
      req.user = user;
      if (user.isLogin) {
        next();
      } else {
        req.flash("error", "User not Authenticate");
        res.redirect("/");
      }
    });
  } else {
    req.flash("error", "User not Authenticate");
    res.redirect("/");
  }
};

module.exports = { verifyToken };
