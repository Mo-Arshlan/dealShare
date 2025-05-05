const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    answer: {
        type: String,
        required: true,
    },

    role: {
        type: Number,
        default: 0
    }
}, {timestamps:true})

const User = mongoose.model('User', userSchema)

module.exports = User 