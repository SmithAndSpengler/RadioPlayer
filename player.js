const ONLINE_CHECK_INTERVAL = 10000; // Interval om te check of Internet connected is
const spawn = require('child_process').spawn;
const checkInternetConnected = require('check-internet-connected');
const fs = require('fs');

function logInfo(info) {
    console.log(`${new Date().toLocaleString()}: ${info}`);
}

checkInternetConnected({
    timeout: 5000,
    retries: 2,
    domain: "https://www.google.com/"
});

let altStream;
let mainStream;
let firstItemPlayed = false;
let checkTimer;

function stopAltStream() {
    if (altStream) {
        altStream.kill();
        altStream = undefined; // Clear pointer om memory leaks te voorkom
    }
}

function startAltStream() {
    if (!altStream) {
        logInfo("STARTING ALT STREAM");
        clearInterval(checkTimer);
        checkTimer = undefined;
        firstItemPlayed = false;
        streamStarted = false;
        altStream = spawn("cvlc", ["-Z", "-L", "-vv", "mp3s/"]); //En repeat playlist verewig -L, -Z is random orde    
        altStream.on('exit', () => {
            logInfo("Alt process exited");
        });

        altStream.stderr.on('data', (data) => {
            const error = new String(data).toString();
            if (error.indexOf("main playlist debug: dead input") > -1) {
                if (!firstItemPlayed) {
                    firstItemPlayed = true;
                } else {
                    //console.log(error);
                    console.log("playlist item completed");
                    checkInternet();
                }
            }

        });

    }
}

function stopMainStream() {
    if (mainStream) {
        mainStream.kill();
        mainStream = undefined; // Clear pointer om memory leaks te voorkom
    }
}

function startMainStream() {
    if (!mainStream) {
        logInfo("STARTING MAIN STREAM");

        const settings = JSON.parse(fs.readFileSync("settings.json"));

        mainStream = spawn("cvlc", [settings.streamURL, "-vv"]);
        mainStream.stdout.on('data', (data) => {
            // console.log(new String(data).toString());
        });
        mainStream.stderr.on('data', (data) => {
            const error = new String(data).toString();
            if (error.indexOf("main playlist debug: nothing to play") > -1) {
                stopMainStream();
                startAltStream();
            } else if (error.indexOf("pulse audio output debug: started") > -1) {
                stopAltStream();
                clearInterval(checkTimer);
                checkTimer = undefined;
                checkTimer = setInterval(() => {
                    checkInternet();
                }, ONLINE_CHECK_INTERVAL);
            }
            //console.error(error);
        });
    }
}

function checkInternet() {
    checkInternetConnected().then(() => {
        startMainStream();
    }).catch(() => {
        stopMainStream();
        startAltStream();
    });
}

checkInternet();
