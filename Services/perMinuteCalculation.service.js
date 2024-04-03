const {create} = require("../DB/controller/minute.controller")

// declaring variable for open, high, low, close, format for date time
let open = null;
let high = null;
let low = null;
let close = null;
let initialTimestamp = null;
let previousMinute = null;
let isMinuteChanged =  true;
let ms = null;

// function to reset the value open, high, low, close
function resetValue(){
  open = null;
  high = null;
  low = null;

  initialTimestamp = null;
  previousMinute = null;
  isMinuteChanged =  true;
  ms = null;
}

// function for processing per minute data
async function perMinuteCalculator(data){
    // Calculation for open, high, low, close
    if(isMinuteChanged){
        // Initialize variable with initial value
        // get open time interval
        ms = data.T % 60000;
        initialTimestamp = data.T - ms;
        previousMinute = initialTimestamp / 60000;

        open = close? close: data.p;
        high = data.p;
        low = data.p;
    }else if(!isMinuteChanged){
        if(high < data.p)
        high = data.p;

        if(low > data.p)
        low = data.p
    }

    ms = data.T % 60000;
    const currentMinute = (data.T - ms) / 60000;

    isMinuteChanged = false;

    if (previousMinute !== currentMinute){
        let dataObj = {
            _id: initialTimestamp,
            open: open,
            high: high,
            low: low,
            close: close
        };
        await create(dataObj);
        
        console.log("Minute Value Changed");

        resetValue();
    }else{
        close = data.p;
    }
}

module.exports = {
    perMinuteCalculator
}