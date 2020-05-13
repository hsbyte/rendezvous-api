const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true,
        unique: true,
        trim: true,
        min: 3
    },
    avatar: {
        content: String,
        content_type: String
    },
    name: { type: String, required: true },
    password: { type: String, max: 1024 },
    email: { type: String, trim: true },
    slogan: String,
    language: String,
    description: String,
    social: Array,
    group_id: Number,
    location: {
        lat: Number,
        lon: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); // User collection
