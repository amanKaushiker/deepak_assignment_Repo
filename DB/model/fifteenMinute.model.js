const mongoose = require("mongoose");

const FifteenMinuteDataSchema = new mongoose.Schema({
    _id: Number,
    open: Number,
    high: Number,
    low: Number,
    close: Number
});

// Create a model for fifteen minutes data
const FifteenMinuteData = new mongoose.model("FifteenMinuteData", FifteenMinuteDataSchema);

module.exports = {
    FifteenMinuteData
}