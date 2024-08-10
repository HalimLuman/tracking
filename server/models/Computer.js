const mongoose = require('mongoose');

const ComputerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    shutdownTime: {
        type: Date,
    },
    totalTime: {
        type: Number, // Time spent in minutes
    },
    downloads: [
        {
            type: String,
        },
    ],
    websites: [
        {
            type: String,
        },
    ],
});

module.exports = mongoose.model('Computer', ComputerSchema);
