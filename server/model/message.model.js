const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema ({

    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        max: 100,
        required: true
    },
    status: {
        type: String,
        max: 10,
        required: true
    }
}, { timestamps: true })

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;
