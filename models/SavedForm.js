const mongoose = require('mongoose');

const savedFormSchema = mongoose.Schema({
    refId: {
        type: Object,
        index: { unique: true }
    },
    user: String
})

const SavedForm = mongoose.model('SavedForm', savedFormSchema);

module.exports = SavedForm;