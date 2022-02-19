const ProductModel = require('../model/product.model');
const fs = require('fs');

const getAllProductsById = async (req, res) => {
    try {
        const userId = req.params.id;
        const products = await ProductModel.find({userId: userId});
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({error: err});
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json(`An error occured when retrieving the product form db: ${err}`);
    }
}

const createProduct = async (req, res) => {
    let productPictures = [];

    try {
        productPictures = req.files.images.map((file) => {
            return file.filename;
        });
        const newProduct = await ProductModel.create({
            userId: req.body.userId,
            name: req.body.name,
            unitPrice: req.body.unitPrice,
            pricePer: req.body.pricePer,
            description: req.body.description,
            images: productPictures,
            allergies: req.body.allergies,
            quantity: req.body.quantity
        });
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({error: err});
    }
}

const updateProduct = async (req, res) => {
    let productPictures = [];

    const product = {
        name: req.body.name,
        unitPrice: req.body.unitPrice,
        pricePer: req.body.pricePer,
        description: req.body.description,
        allergies: req.body.allergies,
        quantity: req.body.quantity
    };

    if (req.files.images) {
        productPictures = req.files.images.map((file) => {
            return file.filename;
        });
        product.images = productPictures;
    }
    ProductModel.findByIdAndUpdate(req.params.id, product, (err, response) => {
        if (err) {
            res.status(400).json({error: err});
        }
        else {
            if(req.files.images) {
                response.images.forEach(image => {
                    try {
                        if (fs.existsSync(`uploads/images/${image}`)){
                            fs.unlinkSync(`uploads/images/${image}`);
                        }
                    } catch (err) {
                        res.status(400).json(err);
                    }
                });
            }
            res.status(200).json(product)
        }
    });
}

const deleteProduct = async (req, res) => {
    ProductModel.findByIdAndDelete(req.params.id, (err, response) => {
        if (err) {
            res.status(400).json({error: err});
        }
        else {
            response.images.forEach(image => {
                try {
                    if (fs.existsSync(`uploads/images/${image}`)){
                        fs.unlinkSync(`uploads/images/${image}`);
                    }
                } catch (err) {
                    res.status(400).json(err);
                }
            });
            res.status(200).json(`The product has been deleted: ${response}`);
        }
    });
}

module.exports = {
    getAllProductsById,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};