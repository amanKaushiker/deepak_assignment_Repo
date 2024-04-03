// Function to get date from epoch timestamp without using getDate method
async function getDateFromEpochWithoutGetDate(epochTimestamp) {
    // Calculate number of seconds in a day
    const secondsInDay = 24 * 60 * 60;

    // Calculate number of days since the epoch
    const daysSinceEpoch = Math.floor(epochTimestamp / secondsInDay);

    // Reference date for the epoch (January 1, 1970)
    const epochYear = 1970;
    const epochMonth = 1;
    const epochDay = 1;

    // Calculate year
    let year = epochYear;
    let daysLeft = daysSinceEpoch;
    while (true) {
        const daysInYear = isLeapYear(year) ? 366 : 365;
        if (daysLeft < daysInYear) break;
        year++;
        daysLeft -= daysInYear;
    }

    // Calculate month and day
    let month = epochMonth;
    let day = epochDay + daysLeft;
    while (true) {
        const daysInMonth = getDaysInMonth(year, month);
        if (day <= daysInMonth) break;
        month++;
        day -= daysInMonth;
    }

    return { year, month, day };
}

// Helper function to check if a year is a leap year
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Helper function to get the number of days in a month
function getDaysInMonth(year, month) {
    const daysInMonthLookup = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonthLookup[month - 1];
}

module.exports = {
    getDateFromEpochWithoutGetDate
}