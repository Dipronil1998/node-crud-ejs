const express = require('express');
const {getAllCustomers, getAddCustomerView, addCustomer,
        getUpdateCustomerView, updateCustomer, getDeleteCustomerView, deleteCustomer} = require('../controllers/customerController');
const {verifyToken} = require("../middleware/verifytoken")
const isLogin = require("../middleware/isLogin");
const router = express.Router();

router.all('/customer/*', verifyToken)
router.get('/customer/list', getAllCustomers);
router.get('/customer/add',  getAddCustomerView);
router.post('/customer/add',  addCustomer);
router.get('/customer/update/:id', getUpdateCustomerView);
router.post('/customer/update/:id',  updateCustomer);
router.get('/customer/delete/:id',  getDeleteCustomerView);
router.post('/customer/delete/:id',  deleteCustomer);



module.exports = {
    routes: router
}