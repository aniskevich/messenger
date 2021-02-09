const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: false, default: 'John Doe' },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, required: false, default: 'What\'s up?!' },
    info: { type: String, required: false, default: 'New user' },
},
    { timestamps: true },
)

module.exports = mongoose.model('user', userSchema)