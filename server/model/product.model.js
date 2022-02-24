const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    userId: {
        type: String,
        required: true
    },
    name:
    {
        type: String,
        required: true,
        max: 30
    },
    unitPrice: {
        type: Number,
        required: true
    },
    pricePer: {
        type: String
    },
    description: {
        type: String,
        required: true,
        max: 50
    },
    category: {
        type: String,
        required: true,
        max: 30
    },
    images: [{
        type: String
    }],
    allergies: [{
        type: String
    }],
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps:true })

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
