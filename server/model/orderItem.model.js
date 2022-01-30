const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema ({
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product',
        required: true
    },
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
    },
    itemUnit: {
        type: String,
        required: true
    }
})

const orderItemModel = mongoose.model('orderItem', orderItemSchema);

module.exports = orderItemModel;

