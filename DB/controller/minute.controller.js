const {MinuteData} = require("../model/minute.model")

async function create(obj = {}){
    const newData = new MinuteData(obj);
    newData.save();
}

module.exports = {
    create
}