const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getLogin = async (req, res, next) => {
  if(res.locals.currentUser){
    res.redirect("/customer/list")
  }
  res.render('login');
}

const getSignup = async (req, res, next) => {
  if(res.locals.currentUser){
    res.redirect("/customer/list")
  }
  res.render('signup');
}

const signUp = async (req, res, next) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    const emailuser = await User.findOne({ email: email });
    if (!emailuser) {
      if (password == confirm_password) {
        const user = new User({
          name: name,
          email: email,
          password: password,
          confirm_password: confirm_password,
        });
        const saveUser = await user.save();
        if (saveUser) {
          req.session.message = {
            'success': 'User created successfully'
          };
          req.app.set('type', 'error');
          res.redirect('/')
        } else {
          req.session.message = {
            'error': 'Invalid input'
          };
          res.redirect('/signup')
        }
      } else {
        req.session.message = {
          'error': 'Passwod Mismatched'
        };
        res.redirect('/signup')
      }
    } else {
      req.session.message = {
        'error': 'User Already Exists'
      };
      res.redirect('/signup')
    }
  } catch (error) {
    console.log(error);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailuser = await User.findOne({ email: email });
    if (emailuser) {
      if (emailuser.status) {
        const isValid = await bcrypt.compare(password, emailuser.password);
        const token = await emailuser.generateAuthToken(true);
        if (isValid) {
          emailuser.isLogin = true;
          req.session.token = token;
          req.session.message = {
            'success': 'Login Success'
          };
          req.session.save(function (err) {
            emailuser.save();
            res.redirect("/customer/list")
          })
        } else {
          req.session.message = {
            'error': 'Crential mismatched'
          };
          res.redirect("/")
        }
      } else {
        req.session.message = {
          'error': 'Your Account is temporally block'
        };
        res.redirect("/")
      }
    } else {
      req.session.message = {
        'error': 'User not exist'
      };
      res.redirect("/")
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res, next) => {
  try {
    console.log(req.user._id);
    const user = await User.findByIdAndUpdate({ _id: req.user._id }, { isLogin: false });
    if (user) {
      req.session.destroy(function (err) {
        res.redirect('/');
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getLogin,
  getSignup,
  logIn,
  signUp,
  logout
}