const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'MGDG Protocol requires a verified name.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'A valid communication channel (email) is mandatory.'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format.']
    },
    status: {
        type: String,
        enum: ['queued', 'verified', 'archived'],
        default: 'queued'
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Lead', leadSchema);