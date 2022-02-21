const express = require('express');
const { createProduct, updateProduct, deleteProduct, getProductById, getProductsByCriteria } = require('../controllers/product');
const auth = require('../helpers/auth');
const {upload} = require('../helpers/storagehelper');
const router = express.Router();

router.get(
    '/product/:id',
    auth,
    getProductById
);

router.get(
    'product/get_all',
    auth,
    getProductsByCriteria
)

router.post(
    '/product/create',
    upload.fields([{
        name: 'images',
        maxCount: 4
    }]),
    auth,
    createProduct
);

router.put(
    '/product/update/:id',
    upload.fields([{
        name: 'images',
        maxCount: 4
    }]),
    auth,
    updateProduct
);

router.delete(
    '/product/delete/:id',
    auth,
    deleteProduct
)

module.exports = router;