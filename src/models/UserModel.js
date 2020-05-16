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
    name: String,
    password: { type: String, max: 1024 },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    banner: {
        content: String,
        content_type: String
    },
    slogan: String,
    language: Array,
    description: String,
    social: Array,
    location: {
        lat: Number,
        lon: Number
    },
    group_id: Array
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); // User collection
