// Camera Background Management
function cameraOn(on) {
    camon = on;
};

// Draws video
function drawVideo(v, c, w, h) {
    // Don't do anything if the video is paused
    if(v.paused || v.ended) return false;

    // Draw a mirrored image
    c.save();
    c.scale(-1, 1);
    c.drawImage(v, w * -1, 0, w, h);
    c.restore();
};