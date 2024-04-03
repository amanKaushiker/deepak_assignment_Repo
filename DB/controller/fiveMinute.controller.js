const {FiveMinuteData} = require("../model/fiveMinute.model");

async function create(obj = {}){
    const newData = new FiveMinuteData(obj);
    newData.save();
}

module.exports = {
    create
}