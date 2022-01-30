const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema ({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    description: {
        type: String,
        required: true,
        max: 35
    },
    content: {
        type: String,
        max: 100
    },
    status: {
        type: String,
        max: 10,
        required: true
    }
}, { timestamps: true })

const notificationModel = mongoose.model('notification', notificationSchema);

module.exports = notificationModel;
