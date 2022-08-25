const express = require('express');
const {getLogin, logIn, getSignup, signUp, logout} = require('../controllers/userController');
const {verifyToken} = require("../middleware/verifytoken")
const isLogin = require("../middleware/isLogin");

const router = express.Router();

router.get('/', getLogin);
router.post('/', logIn);
router.get('/signup', getSignup);
router.post('/signup', signUp);
router.get('/logout', verifyToken,  logout)


module.exports = {
    routes: router
}