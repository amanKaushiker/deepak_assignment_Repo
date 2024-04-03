const {create} = require("../DB/controller/fifteenMinute.controller")

// declaring variable for open, high, low, close, format for date time
let open = null;
let high = null;
let low = null;
let close = null;
let isFifteenMinuteElapsed =  true;
let previousFifteenMinute = null;
let currentMinuteInMs = null;
let ms = null;
let minute = null;

// function to reset the value open, high, low, close
function resetValue(){
  open = null;
  high = null;
  low = null;

  isFifteenMinuteElapsed =  true;
  previousFifteenMinute = null;
  currentMinuteInMs = null;
  ms = null;
  minute = null;
}

// function for processing per fifteen minute data
async function FifteenMinuteCalculator(data){
    // Calculation for open, high, low, close
    if(isFifteenMinuteElapsed){
        // get open time interval
        ms = data.T % 60000;
        minute = (data.T - ms) / 60000;
        if(minute % 15 == 0){
            previousFifteenMinute = data.T - ms;
        }else{
            while((minute % 15) !== 0){
                minute--;
            }

            previousFifteenMinute = minute * 60000;
        }

        // Initialize variable with initial value
        open = close? close: data.p;
        high = data.p;
        low = data.p;
    }else if(!isFifteenMinuteElapsed){
        if(high < data.p)
        high = data.p;

        if(low > data.p)
        low = data.p;
    }

    ms = data.T % 60000;
    currentMinuteInMs = data.T - ms;
    const currentMinute = (data.T - ms) / 60000;

    isFifteenMinuteElapsed = false;

    if ((previousFifteenMinute !== currentMinuteInMs) && ((currentMinute % 15) == 0)){
        let dataObj = {
            _id: previousFifteenMinute,
            open: open,
            high: high,
            low: low,
            close: close
        };
        await create(dataObj);
        
        console.log("Fifteen Minute Elapsed");

        resetValue();
    }else{
        close = data.p;
    }
}

module.exports = {
    FifteenMinuteCalculator
}