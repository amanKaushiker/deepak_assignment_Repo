const {FifteenMinuteData} = require("../model/fifteenMinute.model");

async function create(obj = {}){
    const newData = new FifteenMinuteData(obj);
    newData.save();
}

module.exports = {
    create
}