const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
    group_id: Number,
    group: { type: String, required: true },
    category_id: String,
    description: String,
    members: Number,
    location: {
        lat: Number,
        lon: Number
    },
    meta: {
        likes: Number,
        favs: Number
    },
    uri: String
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema); // Group collection