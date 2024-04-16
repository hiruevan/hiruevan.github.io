let video = document.getElementById("video");
let cvs = document.getElementById("display");
let ctx = cvs.getContext("2d", {willReadFrequently: true});
let allowed = true;
let q = false;

navigator.mediaDevices
    .getUserMedia({
        video: true,
    })
    .then((stream) => {
        video.srcObject = stream;
        forever();
    })
    .catch((error) => {
        alert("Camera access was denied! You cannot use this system without a camera!!!", error);
        allowed = false;
    });

video.width = window.innerWidth;
video.height = window.innerHeight;

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

let mouse = {
    x: 0,
    y: 0
};

let data;
let batons = [];
let pgm;
let setingBaton = -1;
let camon = true;

let curDamp = 0.01;

let b = document.createElement("canvas");
const bDiff = 8; // Baton Accuracy (1 is 100%, 2 is 50%, 3 is 33.3%, 4 is 25%, etc...)
b.width = cvs.width/bDiff;
b.height = cvs.height/bDiff;
let bc = b.getContext("2d", {willReadFrequently: true});

// Set up the system
runJsFile("../Color System/data/appcontrol.js", "system_data");
runJsFile("../Color System/data/batons.js", "system_data");
runJsFile("../Color System/data/camera.js", "system_data");
runJsFile("../Color System/data/hitbox.js", "system_data");
runJsFile("../Color System/data/pgmList.js", "system_data");
runJsFile("../Color System/data/systemMenu.js", "system_data");

// Open Settings
pgm = "settings";
runJsFile("../Color System/apps/settings/main.js", "runningApp");

// The system loop
let tick = 0;
function forever() {
    tick++;
    try {
        if (tick > 120) {
            system();
        } else {
            loading(tick);
            window[pgm + "loadscreen"](tick);
        }
    } catch (e) {
        console.warn("Loading App... (" + e)
    }

    // Loop 60 FPS
    if (allowed) {
        window.requestAnimationFrame(forever);
    } else {
        ctx.globalAlpha = 1;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cvs.width, cvs.height);
    }
};

function system() {
    // Baton Control Magic
    if (camon) {
        drawVideo(video, ctx, cvs.width, cvs.height);
    } else {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cvs.width, cvs.height);
    }
    for (let i = 0; i < batons.length; i++) {
        data = scanVideo(bc, b.width, b.height, batons[i].dampening);
        // let lastBat = batons[i];
        batons[i].particles = searchForColor(batons[i].color, data, b.width, b.height);
        batons[i] = calcCenterOfMass(batons[i]);
        // if (setingBaton <= -1) {
        //     batons[i] = cleanParts(batons[i], lastBat);
        // }
    }

    // Where the main app code is run
    if (setingBaton > -1) {
        setBaton(setingBaton);
    } else {
        try {
            window[pgm]();
        } catch (e) {
            loading();
        }
    }

    // Cursor Display
    if (!(setingBaton > -1)) {
        drawCursors();
    }
    batonResetClick();
};

// Runs a JS file given a url
function runJsFile(url, classname = null) {
    let appCode = document.createElement("script");
    if (classname !== null) {
        appCode.className = classname;
    }
    appCode.src = url;
    document.body.appendChild(appCode);
};

// Events

// Controls clicking
window.addEventListener("click", function(e) {
    if (setingBaton > -1) {
        batons[setingBaton].color = data[mouse.y*b.width+mouse.x];
        let trueColors = scanVideo(bc, b.width, b.height, 1);
        batons[setingBaton].displayColor = trueColors[mouse.y*b.width+mouse.x];
    } else if (pgm === "settings") {
        settingsClick(e);
    }
});

// Controls pressing space (Setting the baton)
window.addEventListener("keydown", function(e) {
    if (setingBaton > -1 && batons[setingBaton].color !== null && e.code === "Space") {
        batons[setingBaton].set = true;
        setingBaton = -1;
    } else if (setingBaton > -1 && e.code === "ArrowLeft") {
        batons[setingBaton].dampening -= 0.001;
    } else if (setingBaton > -1 && e.code === "ArrowRight") {
        batons[setingBaton].dampening += 0.001;
    }
});

// Keeps track of the mouse's pos on the screen
window.addEventListener("mousemove", function(e) {
    mouse.x = Math.floor(e.clientX/bDiff);
    mouse.y = Math.floor(e.clientY/bDiff);
});
