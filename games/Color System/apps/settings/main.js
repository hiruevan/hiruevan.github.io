function settings() {
    // The camera is on in the background
    cameraOn(true);

    // This is just where the settings are rendered
    ctx.fillStyle = "lightblue";
    ctx.globalAlpha = 0.6;
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.globalAlpha = 1;
  
    ctx.fillStyle = "white";
    ctx.font = cvs.height/12 + "px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Settings", 30, cvs.height/10);
  
    ctx.font = cvs.height/16 + "px Arial";
    ctx.fillText("Connected Batons:", 30, cvs.height/14 + cvs.height/10 + 20);
  
    ctx.font = cvs.height/24 + "px Arial";
    let i;
    for (i = 0; i < batons.length; i++) {
        ctx.fillStyle = batons[i].displayColor;
        ctx.fillRect(30, cvs.height/14 + cvs.height/10 + cvs.height/16+10 + (cvs.height/16)*i, 20, 20);
        ctx.fillStyle = "white";
        ctx.globalAlpha = 0.3;
        ctx.fillRect(30, cvs.height/14 + cvs.height/10 + cvs.height/16+10 + (cvs.height/16)*i, 20, 20);
        ctx.globalAlpha = 1;
        ctx.fillText(batons[i].displayColor, 60, cvs.height/14 + cvs.height/10 + cvs.height/16+10 + (cvs.height/16)*i + cvs.height/34);
    }
    if (isTouching({x: mouse.x*bDiff, y: mouse.y*bDiff, width: 1, height: 1}, {x: 30, y: cvs.height/14 + cvs.height/10 + cvs.height/16-cvs.height/55 + (cvs.height/14)*batons.length, width: cvs.height/16*7, height: 30})) {
        ctx.font = cvs.height/23 + "px Arial";
    }
    ctx.fillText("Connect Another Baton", 30, cvs.height/14 + cvs.height/10 + cvs.height/16-cvs.height/55 + (cvs.height/14)*i+25);

    if (batonButton(cvs.width/2 - cvs.width/20, cvs.height - cvs.height/12, cvs.width/20*2, cvs.height/14, function (){leave();})) {
        ctx.font = cvs.height/15 + "px Arial";
    } else {
        ctx.font = cvs.height/22 + "px Arial";
    }
    ctx.textAlign = "center";
    ctx.fillText("Home", cvs.width/2, cvs.height - cvs.height/28)
};

function settingsClick(e) {
    if (isTouching({x: mouse.x*bDiff, y: mouse.y*bDiff, width: 1, height: 1}, {x: 30, y: cvs.height/14 + cvs.height/10 + cvs.height/16-cvs.height/55 + (cvs.height/14)*batons.length, width: cvs.height/16*7, height: 30})) {
        setingBaton = batons.length;
        batons.push({
            color: null,
            displayColor: null,
            x: 0,
            y: 0,
            set: false,
            particles: [],
            disconnected: 0,
            clickCount: 0,
            lastCount: 0,
            dampening: 0.01
        });
    }
};

function settingsloadscreen(percent) {
    let img = document.createElement("img");
    img.src = "./apps/settings/load.png";
    drawRotatedImage(img, percent*8);

    ctx.fillStyle = "white";
    ctx.font = cvs.height/14 + "px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Loading...", cvs.width/2, cvs.height/2 - cvs.height/7);
    
};