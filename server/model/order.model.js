const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema ({

    userId: {
        type: String,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    }
}, { timestamps:true })

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
