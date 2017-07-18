const mongoose = require('mongoose');

const pointedResponseSchema = new mongoose.Schema({
    email: String,
    response: Array,
    submitted: Boolean
});

module.exports = pointedResponseSchema;