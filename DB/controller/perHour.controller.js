const {PerHourData} = require("../model/perHour.model")

async function create(obj = {}){
    const newData = new PerHourData(obj);
    newData.save();
}

module.exports = {
    create
}