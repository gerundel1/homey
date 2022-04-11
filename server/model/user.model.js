const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name:
    {
        type: String,
        required: true,
        max: 30
    },
    email:
    {
        type: String,
        required: true,
        max: 30
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        max: 6
    },
    phone: {
        type: String,
        max: 10
    },
    address: {
        type: String,
        max: 60
    },
    cuisine: {
        type: String,
        max: 25
    }
}, { timestamps:true} )

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
