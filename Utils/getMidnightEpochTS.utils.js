// Function to get epoch timestamp for 12:00 AM on a given date without using Date() function
async function getEpochTimestampForMidnight(epochTimestamp) {
    // Number of seconds in a day
    const secondsInDay = 24 * 60 * 60;
    
    // Calculate the number of days since the epoch
    const daysSinceEpoch = Math.floor(epochTimestamp / secondsInDay);
    
    // Calculate the epoch timestamp for 12:00 AM by multiplying the number of days by seconds in a day
    const epochTimestampForMidnight = daysSinceEpoch * secondsInDay;
    
    return epochTimestampForMidnight;
}

module.exports = {
    getEpochTimestampForMidnight
}
