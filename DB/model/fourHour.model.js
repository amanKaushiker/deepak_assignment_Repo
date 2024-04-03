const mongoose = require("mongoose");

const FourHourDataSchema = new mongoose.Schema({
    _id: Number,
    open: Number,
    high: Number,
    low: Number,
    close: Number
});

// Create a model for four hour data
const FourHourData = new mongoose.model("FourHourData", FourHourDataSchema);

module.exports = {
    FourHourData
}