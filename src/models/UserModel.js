const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true,
        unique: true,
        trim: true,
        min: 3
    },
    avatar: { type: String },
    name: { type: String, required: true },
    password: { type: String, max: 1024 },
    email: { type: String },
    slogan: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); // User collection
