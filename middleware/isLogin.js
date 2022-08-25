const User = require("../models/user");

exports.isLogin = async (req, res, next) => {
  const IsLoginUser = await User.findById({ _id: req.user._id });
  if (IsLoginUser.isLogin) {
    next();
  } else {
    req.flash('error', 'User not Authenticate');
    res.redirect("/");
  }
};