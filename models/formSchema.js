const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    formTitle: String,
    elements: Array
});

module.exports = formSchema;