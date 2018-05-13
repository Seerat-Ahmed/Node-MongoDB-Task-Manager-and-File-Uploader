const mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp');

/**
 * Creating Todo Schema
 */
const TodoSchema = new mongoose.Schema({
    task: {
        type: String
    },
    timestamp: {
        type: Date
    },
    isDone: {
        type: Boolean
    }
}, { collection: 'todos' });

// Settingn timpstamp plugin
TodoSchema.plugin(timestamps);

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;
