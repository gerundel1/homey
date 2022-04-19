const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema ({

    userEmail: {
        type: String,
        required: true
    },
    sellerEmail: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    orderItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'product',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
        }
    }],
}, { timestamps:true })

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
