const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    intake: {
        type: Number,
        required: true
    },
    burnt: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }

}, { timestamps: true }
);

const dataModel = new mongoose.model('Calorie', dataSchema);
module.exports = dataModel;
