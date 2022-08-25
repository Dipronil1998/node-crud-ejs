const Customer = require('../models/customer');

const getAllCustomers = async (req, res, next) => {
    const list = await Customer.find();
    res.render('customerlist', {
        customers: list
    });
}

const getAddCustomerView = (req, res, next) => {
    res.render('addCustomer');
}

const addCustomer = async (req, res, next) => {
    try {
        let customer = await new Customer({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phonenumber: req.body.phonenumber,
            address: req.body.address
        });
        await customer.save();
        req.session.message = {
            'success': 'Customer add successfuly'
        };
        res.redirect('/customer/list');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getUpdateCustomerView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const onecustomer = await Customer.findById(id);
        res.render('updateCustomer', {
            customer: onecustomer
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateCustomer = async (req, res, next) => {
    try {
        const id = req.params.id;
        let customer = await Customer.findByIdAndUpdate(id, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phonenumber: req.body.phonenumber,
            address: req.body.address
        }, { new: true });
        if (!customer) return res.status(404).send('Customer with the given id not found');
        req.session.message = {
            'success': 'Customer update successfuly'
        };
        res.redirect('/customer/list');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getDeleteCustomerView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const onecustomer = await Customer.findById(id).exec();
        res.render('deleteCustomer', {
            customer: onecustomer
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteCustomer = async (req, res, next) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findByIdAndRemove(id);
        if (!customer) return res.status(404).send('Customer with the given id not found');
        res.redirect('/customer/list');
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    getAllCustomers,
    getAddCustomerView,
    addCustomer,
    getUpdateCustomerView,
    updateCustomer,
    getDeleteCustomerView,
    deleteCustomer
}