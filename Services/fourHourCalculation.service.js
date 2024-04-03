const {create} = require("../DB/controller/fourHour.controller")

// declaring variable for open, high, low, close, format for date time
let open = null;
let high = null;
let low = null;
let close = null;
let initialTS = null;
let isFourHourElapsed =  true;
let previousHour = null;
let currentHour = null;
let ms = null;
let second = null
let minute = null;
let count = 0;

// function to reset the value open, high, low, close
function resetValue(){
  open = null;
  high = null;
  low = null;

  initialTS = null;
  isFourHourElapsed =  true;
  previousHour = null;
  currentHour = null;
  close = null;
  ms = null;
  second = null;
  minute = null;
  count = 0;
}

// function for processing four hour data
async function FourHourCalculator(data){
    // Calculation for open, high, low, close
    if(isFourHourElapsed){
        // get open time interval
        ms = data.T % 60000;
        let ts = data.T - ms;
        second = Math.floor((ts / 1000) % 60);
        minute = Math.floor((ts / 60000) % 60);
        ts = ts - (second * 1000 + minute * 60000);
        
        previousHour = Math.floor(data.T / (3600*1000)) % 24;
        console.log("previous hour", previousHour, initialTS);
        if(previousHour % 4 == 0){
            initialTS = ts;
        }else{
            while((previousHour % 4) !== 0){
                count++; 
                previousHour--;
            }

            initialTS = ts - (count * 3600 * 1000);
        }
        // Initialize variable with initial value
        open = close? close: data.p;
        high = data.p;
        low = data.p;
    }else if(!isFourHourElapsed){
        if(high < data.p)
        high = data.p;

        if(low > data.p)
        low = data.p;
    }

    currentHour = Math.floor(data.T / (3600*1000)) % 24;
    console.log("current hour", currentHour, initialTS);

    isFourHourElapsed = false;

    if ((previousHour !== currentHour) && ((currentHour % 4) == 0)){
        let dataObj = {
            _id: initialTS,
            open: open,
            high: high,
            low: low,
            close: close
        };
        await create(dataObj);
        
        console.log("Four Hour Elapsed");

        resetValue();
    }else{
        close = data.p;
    }
}

module.exports = {
    FourHourCalculator
}