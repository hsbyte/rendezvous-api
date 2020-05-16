const mongoose = require('mongoose');
const privateMessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true
    },
    from_user_id: {
        type: String,
        required: true
    },
    to_user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });