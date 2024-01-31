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
const gearWorks = {
    log: function(log) {
        try{gw_log(log);}
        catch(err){throw "there is no gearworks console";}
    },
    warn: function(log) {
        try{gw_warn(log);}
        catch(err){throw "there is no gearworks console";}
    },
    error: function(log) {
        try{gw_error(log);}
        catch(err){throw "there is no console";}
    },
    clear: function() {
        try{gw_clearConsole();}
        catch(err){throw "there is no console";}
    }
    
};
