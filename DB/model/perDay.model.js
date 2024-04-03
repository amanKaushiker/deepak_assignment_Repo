const mongoose = require('mongoose');

const DayDataSchema = new mongoose.Schema({
    _id: Number,
    open: Number,
    high: Number,
    low: Number,
    close: Number
});

// Create a model for day data
const DayData = mongoose.model('DayData', DayDataSchema);

module.exports = {DayData};