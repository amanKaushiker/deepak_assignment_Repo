const {create} = require("../DB/controller/perHour.controller")

// declaring variable for open, high, low, close, format for date time
let open = null;
let high = null;
let low = null;
let close = null;
let initialTS = null;
let isHourElapsed =  true;
let previousHour = null;
let currentHour = null;
let ms = null;
let second = null
let minute = null;

// function to reset the value open, high, low, close
function resetValue(){
  open = null;
  high = null;
  low = null;

  initialTS = null;
  isHourElapsed =  true;
  previousHour = null;
  currentHour = null;
  close = null;
  ms = null;
  second = null;
  minute = null;
}

// function for processing per hour data
async function PerHourCalculator(data){
    // Calculation for open, high, low, close
    if(isHourElapsed){
        // get open time interval
        ms = data.T % 60000;
        let ts = data.T - ms;
        second = Math.floor((ts / 1000) % 60);
        minute = Math.floor((ts / 60000) % 60);
        ts = ts - (second * 1000 + minute * 60000);
        initialTS = ts;

        previousHour = Math.floor(data.T / (3600*1000)) % 24;

        // Initialize variable with initial value
        open = close? close: data.p;
        high = data.p;
        low = data.p;
    }else if(!isHourElapsed){
        if(high < data.p)
        high = data.p;

        if(low > data.p)
        low = data.p;
    }

    currentHour = Math.floor(data.T / (3600*1000)) % 24;

    isHourElapsed = false;

    if (previousHour !== currentHour){
        let dataObj = {
            _id: initialTS,
            open: open,
            high: high,
            low: low,
            close: close
        };
        await create(dataObj);
        
        console.log("An Hour Elapsed");

        resetValue();
    }else{
        close = data.p;
    }
}

module.exports = {
    PerHourCalculator
}