const mongoose = require("mongoose");

const PerHourDataSchema = new mongoose.Schema({
    _id: Number,
    open: Number,
    high: Number,
    low: Number,
    close: Number
});

// Create a model for per hour data
const PerHourData = new mongoose.model("PerHourData", PerHourDataSchema);

module.exports = {
    PerHourData
}