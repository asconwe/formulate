const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    formTitle: String,
    elements: Array
});

const Form = mongoose.model('Form', formSchema);

module.exports = formSchema;