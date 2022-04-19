const express = require('express');
const { createProduct, updateProduct, deleteProduct, getProductById, getProductsByCriteria, returnPictureByFilename } = require('../controllers/product');
const auth = require('../helpers/auth');
const {upload} = require('../helpers/storagehelper');
const router = express.Router();

router.get(
    '/product/:id',
    // auth,
    getProductById
);

router.get(
    '/products/get_all',
    // auth,
    getProductsByCriteria
);

router.get(
    '/product/image/:name',
    returnPictureByFilename
)

router.post(
    '/product/create',
    upload.fields([{
        name: 'images',
        maxCount: 4
    }]),
    // auth,
    createProduct
);

router.put(
    '/products/update/:id',
    upload.fields([{
        name: 'images',
        maxCount: 4
    }]),
    auth,
    updateProduct
);

router.delete(
    '/products/delete/:id',
    // auth,
    deleteProduct
)

module.exports = router;