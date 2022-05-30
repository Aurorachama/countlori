const mongoose = require('mongoose');

const presetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }

}, { timestamps: true }
);

const presetModel = new mongoose.model('Preset', presetSchema);
module.exports = presetModel;
