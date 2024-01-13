// Get canvas
const gw_canvas = document.getElementById('cvs');

// Get context
let gw_ctx = gw_canvas.getContext("2d");
gw_ctx.background = function(color) {
    let prevCol = this.fillStyle;
    this.fillStyle = color;
    this.fillRect(0, 0, 800, 800);
    this.fillStyle = prevCol;
}

// draw obj
const draw = gw_ctx;

// gearWorks obj
const gearWorks = {};
gearWorks.log = function(log) {
    console.log(log);
    gw_log(log);
}
gearWorks.warn = function(log) {
    console.warn(warn);
    gw_warn(log);
}
gearWorks.error = function(log) {
    console.error(log);
    gw_error(log);
}
