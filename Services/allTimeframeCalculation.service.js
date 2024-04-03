const { create } = require("../DB/controller/minute.controller");

const holdData = {};
let initialTS = 0;
let isTimeFrameElapsed = true;

const timeframes = ["1m"];

const timeframeMap = {
  "1m": 1,
};

roundTimestamp = (ts, key) => {
  ts = ts - (ts % (timeframeMap[`${key}`] * 60000));
  return ts;
};

// function to reset the value open, high, low, close
function resetValue(data) {
  data.open = null;
  data.high = null;
  data.low = null;
}

function isTimeChanged(pts, cts, key) {
  let past = pts / (timeframeMap[`${key}`] * 60000);
  let present = cts / (timeframeMap[`${key}`] * 60000);

  if (present - past == 1) return true;
  else return false;
}

async function allTimeFrameCalculation(data) {
  for (let element of data) {
    for (let i = 0; i < timeframes.length; i++) {
      if (isTimeFrameElapsed) {
        initialTS = roundTimestamp(element.T, timeframes[i]);
        holdData[timeframes[i]] = {
          open:
            holdData[timeframes[i]]?.close !== undefined
              ? holdData[timeframes[i]]?.close
              : element.p,
          high: element.p || null,
          low: element.p || null,
          close: element.p || null,
        };
      }

      let currentTime = roundTimestamp(element.T, timeframes[i]);
      isTimeFrameElapsed = isTimeChanged(initialTS, currentTime, timeframes[i]);

      if (!isTimeFrameElapsed) {
        if (holdData[timeframes[i]].high < element.p)
          holdData[timeframes[i]].high = element.p;

        if (holdData[timeframes[i]].low > element.p)
          holdData[timeframes[i]].low = element.p;
      }

      if (isTimeFrameElapsed) {
        console.log("Time frame changed", holdData[timeframes[i]]);
        holdData[timeframes[i]]._id = new Date(initialTS).toISOString();
        console.log("time : ", holdData[timeframes[i]]._id);
        //await create(holdData[timeframes[i]]);

        resetValue(holdData[timeframes[i]]);
      } else {
        holdData[timeframes[i]].close = element.p ? element.p : null;
      }
    }
  }
}

module.exports = {
  allTimeFrameCalculation,
};
