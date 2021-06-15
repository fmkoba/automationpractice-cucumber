const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "cypress/cucumber-json", 
    reportPath: "./reports/" + getTimestamp() + "/cucumber-htmlreport.html",
    metadata: {
        browser: {
            name: "chrome",
            version: "91",
        },
        device: "Local test machine",
        platform: {
        name: "dev",
        version: "windows 10",
        },
    },
});

function getTimestamp() {
    const dateObj = new Date();
    return '' + dateObj.getSeconds() + dateObj.getMinutes() + dateObj.getHours() + dateObj.getDay() + (dateObj.getMonth() + 1) + dateObj.getYear();
}