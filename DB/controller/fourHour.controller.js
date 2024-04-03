const {FourHourData} = require("../model/fourHour.model")

async function create(obj = {}){
    const newData = new FourHourData(obj);
    newData.save();
}

module.exports = {
    create
}