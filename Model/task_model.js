const mongoose = require("mongoose");

const task_schema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    due_data: {
        type: String,
    },
    priority: {
        type: String,
    },
    status: {
        type: String,
        default: "pending"
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

module.exports = mongoose.model("tasks", task_schema);