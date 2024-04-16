// Application Management
function leave() {
    pgm = "menu";
    let runningCode = document.getElementsByClassName("runningApp");
    for (let i = 0; i < runningCode.length; i++) {
        runningCode[i].remove();
    }
    tick = 0;
};

function openPgm(app) {
    leave();
    if (pgms.includes(app)) {
        pgm = app;
        runJsFile("./apps/" + app + "/main.js", "runningApp");
    } else {
        console.error("That app does not exist!!!");
    }
};