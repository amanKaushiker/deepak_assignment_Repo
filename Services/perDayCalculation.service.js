const {getDateFromEpochWithoutGetDate} = require("../Utils/getYearMonthDate.utils")
const {getEpochTimestampForMidnight} = require("../Utils/getMidnightEpochTS.utils")
const {create} = require("../DB/controller/perDay.controller")

// declaring variable for open, high, low, close, format for date time
let open = null;
let high = null;
let low = null;
let close = null;
let initialTS = null;
let isDayElapsed = true;
let previousDay = null;
let currentDay = null;

// function to reset the value open, high, low, close
function resetValue(){
  open = null;
  high = null;
  low = null;

  initialTS = null
  isDayElapsed = true;
  previousDay = null;
  currentDay = null;
}

// function for processing a day data
async function DayDataCalculator(data){
    // Calculation for open, high, low, close
    if(isDayElapsed){
        // get open time interval
        let { day } = await getDateFromEpochWithoutGetDate(Math.floor(data.T / 1000));
        previousDay = day;
        initialTS = await getEpochTimestampForMidnight(Math.floor(data.T / 1000));

        // Initialize variable with initial value
        open = close? close: data.p;
        high = data.p;
        low = data.p;
    }else if(!isDayElapsed){
        if(high < data.p)
        high = data.p;

        if(low > data.p)
        low = data.p;
    }

    let { day } = await getDateFromEpochWithoutGetDate(Math.floor(data.T / 1000));
    currentDay = day;

    isDayElapsed = false;

    if (previousDay !== currentDay){
        let dataObj = {
            _id: initialTS,
            open: open,
            high: high,
            low: low,
            close: close
        };
        await create(dataObj);
        
        console.log("A Day Elapsed");

        resetValue();
    }else{
        close = data.p;
    }
}

module.exports = {
    DayDataCalculator
}