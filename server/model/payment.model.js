const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema ({
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    auth: {
        type: String,
        required: true
    }
})

const paymentModel = mongoose.model('payment', paymentSchema);

module.exports = paymentModel;

