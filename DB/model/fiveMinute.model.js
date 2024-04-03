const mongoose = require("mongoose");

const FiveMinuteDataSchema = new mongoose.Schema({
    _id: Date,
    open: Number,
    high: Number,
    low: Number,
    close: Number
});

// Create a model for five minutes data
const FiveMinuteData = new mongoose.model("FiveMinuteData", FiveMinuteDataSchema);

module.exports = {
    FiveMinuteData
}