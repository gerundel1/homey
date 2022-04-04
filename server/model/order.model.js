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
        type: String
    },
    orderItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'product',
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
    }],
}, { timestamps:true })

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
