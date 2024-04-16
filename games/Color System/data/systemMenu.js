function menu() {
    cameraOn(false);


};

// Displays loading screen
function loading(percent) {
    let t = percent > 100 ? 100 : percent;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "white";
    ctx.font = cvs.height/14 + "px Monospace";
    ctx.textAlign = "center";
    ctx.fillText("Closing Software...", cvs.width/2, cvs.height/2);
    ctx.font = cvs.height/28 + "px Monospace";
    let loadStr = "[";
    let i = 0;
    while (i < t/10) {
        loadStr += "#";
        i++;
    }
    for (let q = 0; q < 10 - i; q++) {
        loadStr += ".";
    }
    loadStr += "]";
    ctx.fillText(loadStr, cvs.width/2, cvs.height/2 + cvs.height/12);
};

function drawRotatedImage(image, degrees){
    ctx.clearRect(0,0,cvs.width,cvs.height);
    ctx.save();
    ctx.translate(cvs.width/2,cvs.height/2);
    ctx.rotate(degrees*Math.PI/180);
    ctx.drawImage(image,-image.width/4,-image.width/4, image.width/2, image.width/2);
    ctx.restore();
}