const {DayData} = require("../model/perDay.model")

async function create(obj = {}){
    const newData = new DayData(obj);
    newData.save();
}

module.exports = {
    create
}