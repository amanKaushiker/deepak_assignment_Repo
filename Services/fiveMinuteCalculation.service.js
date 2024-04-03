const {create} = require("../DB/controller/fiveMinute.controller")

// declaring variable for open, high, low, close, format for date time
let open = null;
let high = null;
let low = null;
let close = null;
let isFiveMinuteElapsed =  true;
let previousFiveMinute = null;
let currentMinuteInMs = null;
let ms = null;
let minute = null;

// function to reset the value open, high, low, close
function resetValue(){
  open = null;
  high = null;
  low = null;

  isFiveMinuteElapsed =  true;
  previousFiveMinute = null;
  currentMinuteInMs = null;
  ms = null;
  minute = null;
}

// function for processing per five minute data
async function FiveMinuteCalculator(data){
    // Calculation for open, high, low, close
    if(isFiveMinuteElapsed){
        // get open time interval
        ms = data.T % 60000;
        minute = (data.T - ms) / 60000;
        if(minute % 5 == 0){
            previousFiveMinute = data.T - ms;
        }else{
            while((minute % 5) !== 0){
                minute--;
            }

            previousFiveMinute = minute * 60000;
        }

        // Initialize variable with initial value
        open = close? close: data.p;
        high = data.p;
        low = data.p;
    }else if(!isFiveMinuteElapsed){
        if(high < data.p)
        high = data.p;

        if(low > data.p)
        low = data.p;
    }

    ms = data.T % 60000;
    currentMinuteInMs = data.T - ms;
    const currentMinute = (data.T - ms) / 60000;

    isFiveMinuteElapsed = false;

    if ((previousFiveMinute !== currentMinuteInMs) && ((currentMinute % 5) == 0)){
        let dataObj = {
            _id: previousFiveMinute,
            open: open,
            high: high,
            low: low,
            close: close
        };
        await create(dataObj);
        
        console.log("Five Minute Elapsed");

        resetValue();
    }else{
        close = data.p;
    }
}

module.exports = {
    FiveMinuteCalculator
}