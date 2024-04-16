// Calculates the center of mass of the batons
function calcCenterOfMass(baton) {
    let avX = 0;
    let avY = 0;
    for (let i = 0; i < baton.particles.length; i++) {
        avX += baton.particles[i].x;
        avY += baton.particles[i].y;
    }

    let bat = baton;

    bat.disconnected++;
    if (bat.disconnected > 16) {
        bat.x = -50;
        bat.y = -50;
    }

    if (baton.particles.length > bDiff*2) {
        console.log("hi")

        bat.x += 0.3*(((avX/baton.particles.length)*bDiff)-bat.x);
        bat.y += 0.3*(((avY/baton.particles.length)*bDiff)-bat.y);
        bat.disconnected = 0;
    }

    return bat;
};

// Resets and controls the baton's clicking
function batonResetClick() {
    for (let i = 0; i < batons.length; i++) {
        if (batons[i].clickCount === batons[i].lastCount) {
            batons[i].clickCount = 0;
        }
        batons[i].lastCount = batons[i].clickCount;
    }
};

// Draws the batons' cursors
function drawCursors() {
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < batons.length; i++) {
        ctx.fillStyle = batons[i].displayColor;
        ctx.fillRect(batons[i].x-(20+(batons[i].clickCount/30)), batons[i].y-(20+(batons[i].clickCount/30)), (40+(batons[i].clickCount/30*2)), (40+(batons[i].clickCount/30*2)));
        ctx.fillStyle = "white";
        ctx.fillRect(batons[i].x-15, batons[i].y-15, 30, 30);
        if (batons[i].clickCount > 0) {
            ctx.font = "35px Arial";
            ctx.textAlign = "center";
            let n = 3;
            n -= Math.floor(batons[0].clickCount/30);
            ctx.fillText(n, batons[i].x, batons[i].y+12);
       }
    }
};

// Removes Lone Particles
function removeLoneParts(baton) {
    let bat = baton;
    let toSplice = [];
    if (bat.particles.length < 1) {
        return bat;
    }
    for (let i = 0; i < bat.particles.length; i++) {
        let neighbors = 0;
        let part = bat.particles[i];
        if (bat.particles.includes({x: part.x+1, y: part.y})) {
            neightbors++;
        }
        if (bat.particles.includes({x: part.x-1, y: part.y})) {
            neightbors++;
        }
        if (bat.particles.includes({x: part.x+1, y: part.y+1})) {
            neightbors++;
        }
        if (bat.particles.includes({x: part.x-1, y: part.y+1})) {
            neightbors++;
        }
        if (bat.particles.includes({x: part.x+1, y: part.y-1})) {
            neightbors++;
        }
        if (bat.particles.includes({x: part.x-1, y: part.y-1})) {
            neightbors++;
        }
        if (bat.particles.includes({x: part.x, y: part.y-1})) {
            neightbors++;
        }
        if (bat.particles.includes({x: part.x, y: part.y+1})) {
            neightbors++;
        }
        if (neighbors < 9) {
            toSplice.push(i);
        }
    }
    for (let i = 0; i < toSplice.length; i++) {
        bat.particles.splice(toSplice[i], 1);
    }
    if (bat.particles.length < 30) {
        bat.particles  = [];
    }
    return bat;
};

function cleanParts(baton, lastBat) {
    let bat = baton;
    for (let i = 0; i < bat.particles.length; i++) {
        let diffx = bat.particles[i].x - lastBat.x;
        let diffy = bat.particles[i].y - lastBat.y;
        let dist = Math.sqrt((diffx*diffx) + (diffy*diffy));
        if (dist > 160 && !baton.disconnected > 16) {
            bat.particles.splice(i, 1);
            i--;
        }
    }
    return bat;
}

// Sets up the batons
function setBaton(batNum) {
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < batons[batNum].particles.length; i++) {
        ctx.fillRect(batons[batNum].particles[i].x*bDiff, batons[batNum].particles[i].y*bDiff, bDiff, bDiff);
    }
    ctx.globalAlpha = 1;

    ctx.textAlign = "center";

    if (batons[batNum].color === null) {
        ctx.font = cvs.width/13.7 + "px Arial";
        ctx.fillText("Click on Your Baton", cvs.width/2, cvs.height - 15);
    } else {
        ctx.font = cvs.width/14 + "px Arial";
        ctx.fillText("Is this Your Baton?", cvs.width/2, cvs.height - cvs.width/18);
        ctx.font = cvs.width/20 + "px Arial";
        ctx.fillText("<Press Space>", cvs.width/2, cvs.height - 15);
    }

    ctx.font = cvs.height/14 + "px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText(Math.floor(batons[batNum].dampening*1000)/1000, 10, 100);
};

// Searches the screen for a color
function searchForColor(color, dt, w, h) {
    let arr = [];
    if (dt.includes(color)) {
        for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            if (dt[y*w+x] === color) {
            arr.push({x: x, y: y});
            }
        }
        }
    }
    return arr;
};

// Scans the video
function scanVideo(c, w, h, d) {
    drawVideo(video, c, w, h);
    let dt = c.getImageData(0, 0, w, h);
    let da = [];
    for (let i = 0; i < dt.data.length; i += 4) {
        da.push(rgbToHex(Math.floor(dt.data[i]*d), Math.floor(dt.data[i+1]*d), Math.floor(dt.data[i+2]*d), dt.data[i+3]));
    }
    return da;
};

// Converts rgb color values to hex
function rgbToHex(r, g, b) {
    let num = r*65536+g*256+b;
    let ret = "#" + num.toString(16);
    while (ret.length < 7) {
        ret += "0";
    }
    return ret;
};