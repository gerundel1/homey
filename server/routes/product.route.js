const express = require('express');
const { createProduct, updateProduct, deleteProduct, getAllProductsById, getProductById } = require('../controllers/product');
const auth = require('../helpers/auth');
const {upload} = require('../helpers/storagehelper');
const router = express.Router();

router.get(
    '/products/get_all/:id',
    auth,
    getAllProductsById
);

router.get(
    '/product/:id',
    auth,
    getProductById
)

router.post(
    '/product/create',
    upload.fields([{
        name: "images",
        maxCount: 4
    }]),
    //auth,
    createProduct
);

router.put(
    '/product/update/:id',
    upload.fields([{
        name: "images",
        maxCount: 4
    }]),
    auth,
    updateProduct
);

router.delete(
    '/product/delete/:id',
    auth,
    updateProduct
)

module.exports = router;