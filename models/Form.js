const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    formName: String,
    formElements: Array
});

const Form = mongoose.Model('Form', formSchema);

module.exports = Form;