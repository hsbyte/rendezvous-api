const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true,
        unique: true,
        trim: true,
        minlength: 3
    },
    avatar: { type: String },
    name: { type: String, required: true },
    password: { type: String },
    email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);