const mongoose = require('mongoose');
const hotel = new mongoose.Schema({
    name: {
        type: String
    },
    rating: {
        type: Number
    },
    numReview: {
        type: Number
    },
    location: {
        type: String
    },
    service: {
        type: Array
    },
    type: {
        type: String
    }
}, {
    timestamps: true
});
const hotelModel = mongoose.model('hotel', hotel)
module.exports = hotelModel
