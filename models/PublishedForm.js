const mongoose = require('mongoose');

const publishedFormSchema = new mongoose.Schema({
    formTitle: String,
    elements: Array,
    refId: String,
    responses: Array,
});

const PublishedForm = mongoose.model('PublishedForm', publishedFormSchema);

module.exports = PublishedForm;