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
var draw = gw_ctx;
draw.image = function(pUrl, x, y, h = null, w = null, c = null, d = null) {
    let itemName = pUrl;
    let url;
    if (gw_cabinet.imageNames.includes(itemName)) {
        let src = gw_cabinet.imageUrls[gw_cabinet.imageNames.indexOf(itemName)];

        // Images need the entire element
        let img = document.createElement("img");
        img.src = src;
        url = img;
    } else {

        // If nothing else works
        try
        {
            gw_error("URL Converter: The requested URL does not exist.");
        }
        catch
        {
            throw "wait... that didn't work, maybe you didn't calabrate the program corectly? IDK why you would do that, I think ur dumb.";
            //please don't change the throw, its funny.
        }
        return;
    }
    if (h == null && w == null) {
        this.drawImage(url, x, y);
    } else {
        if (c == null && d == null) {
            this.drawImage(url, x, y, h, w);
        } else {
            this.drawImage(url, x, y, h, w, c, d);
        }
    }
}



// gearWorks obj
const gearWorks = {
    log: function(log) {
        try{gw_log(log);}
        catch(err){throw "there is no gw console, for your logs to go to sorry";}
    },
    warn: function(log) {
        try{gw_warn(log);}
        catch(err){throw "there is no gw console, for your logs to go to sorry";}
    },
    error: function(log) {
        try{gw_error(log);}
        catch(err){throw "there is no gw console, for your logs to go to sorry";}
    },
    clear: function() {
        try{gw_clearConsole();}
        catch(err){throw "there is no gw console, for your logs to go to sorry";}
    },
    url: function(url) {
        if (!url[0] == "/") {
            gw_error("URL Converter: The string entered is not a URL.")
        }
        let itemName = url;
        itemName.slice(0, 1)
        if (gw_cabinet.imageNames.includes(itemName)) {
            let url = gw_cabinet.imageUrls[gw_cabinet.imageNames.indexOf(itemName)];

            // Images need the entire element
            let img = document.createElement("img");
            img.src = url;
            return img;
        } else if (gw_cabinet.soundNames.includes(itemName)) {
            let url = gw_cabinet.soundUrls[gw_cabinet.soundNames.indexOf(itemName)];

            // Sounds only need the url
            return url;
        } else {

            // If nothing else works
            gw_error("URL Converter: The requested URL does not exist.");
            let img = document.createElement("img");
            img.src = "#";
            return img;
        }
    },
    playSound: function(pUrl, repeat = false) {
        let url;
        if (gw_cabinet.soundNames.includes(pUrl)) {
            url = gw_cabinet.soundUrls[gw_cabinet.soundNames.indexOf(pUrl)];
        } else {
            // If nothing else works
            gw_error("URL Converter: The requested URL does not exist.");
            return;
        }
        let sound = document.createElement("audio");
        sound.src = url;
        sound.loop = true;
        sound.classList.add("canvas-sound");
        document.body.appendChild(sound);
        sound.play();
    },
    //please don't get mad at me for this:
    pmp: function(){
        gearWorks.log("park-master-pro!!!!!!!!");
        alert("The master of pros!!!");
    },
    nm: function(){
        gearWorks.log("MR. PolyGon!!!!");
        alert("Shape is in his name");
    },
    eh: function(){
        gearWorks.log("tHe EBaN of hIRU!!!!");
        alert("Mr Big Brain");
    },
    mk: function(){
        gearWorks.log("the K of T!!!");
        alert('"Cool Dude" - papyrus');
    }
    
};
