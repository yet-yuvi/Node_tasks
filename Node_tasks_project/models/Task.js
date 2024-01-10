// models/Task.js

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Task = mongoose.model('Task', TaskSchema);