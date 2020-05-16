const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: String,
    group_id: {
        type: String, required: true
    },
    comments: {
        author_user_id: {
            type: String,
            required: true
        },
        text: String,
        meta: {
            likes: Number,
            favs: Number
        },
        timestamp: Date,
        reply: [
            {
                user_id: {
                    type: String,
                    required: true
                },
                text: String,
                meta: {
                    likes: Number,
                    favs: Number
                },
                timestamp: Date
            }
        ]
    }
}, { timestamps: true }) ;