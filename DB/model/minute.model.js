const mongoose = require('mongoose');

const MinuteDataSchema = new mongoose.Schema({
    _id: Date,
    open: Number,
    high: Number,
    low: Number,
    close: Number
});

// Create a model for minute data
const MinuteData = mongoose.model('MinuteData', MinuteDataSchema);

module.exports = {MinuteData};