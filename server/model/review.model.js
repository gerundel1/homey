const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        max: 10,
        required: true
    },
    description: {
        type: String,
        max: 50,
        required: true
    }
}, { timestamps: true })

const reviewModel = mongoose.model('review', reviewSchema);

module.exports = reviewModel;
