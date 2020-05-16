const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    public: Boolean,
    photos: Array
}, { timestamps: true } );