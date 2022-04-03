const express = require('express');
const auth = require('../helpers/auth');
const router = express.Router();
const  { createOrder, getOrdersByCriteria } = require('../controllers/order');

router.get(
    '/orders/get_all',
    // auth,
    getOrdersByCriteria
);

router.post(
    '/order/create',
    // auth,
    createOrder
);

module.exports = router;