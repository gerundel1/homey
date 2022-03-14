const ProductModel = require('../model/product.model');
const fs = require('fs');
const path = require('path');


const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json(`An error occured when retrieving the product form db: ${err}`);
    }
}

// Example of request url: http://localhost:8080/api/users/get_all?user=john.smith@example.com&category=baked&order=unitPrice&page=2
// Please note that pagination in this function starts from 0 (0 is 1 page)
// Limit is a field that limits the number of records in the returned array
// For sorting, you can pass 'desc' for descending and 'asc' for ascending (desc is default)
const getProductsByCriteria = async (req, res) => {
    try {
        const order = req.query.order || 'name';
        const sort = req.query.sort || 'desc'
        const category = req.query.category || null;
        const user = req.query.user || null;
        const page = req.query.page || 0;
        const limit = req.query.limit || 20;
        let criteria = {};
        if(category) {
            criteria['category'] = category;
        }
        if(user) {
            criteria['email'] = user;
        }
        let orderCondition = {};
        orderCondition[order] = sort;

        const products = await ProductModel.find(criteria).sort(orderCondition).skip(page * limit).limit(limit);
        res.status(200).json(products);
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
            category: req.body.category,
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
        category: req.body.category,
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

const returnPictureByFilename = async (req, res) => {
    const filename = req.params.name;
    let p = path.join(__dirname, `../uploads/images/${filename}`);
    res.sendFile(p);
}

module.exports = {
    getProductsByCriteria,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    returnPictureByFilename
};