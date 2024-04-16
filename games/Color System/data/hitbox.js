// Hitbox code
function isTouching(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
};

// Buttons
function batonButton(x, y, w, h, fun) {
    let t = false;
    for (let i = 0; i < batons.length; i++) {
        if (isTouching({x: batons[i].x-20, y: batons[i].y-20, width: 40, height: 40}, {x: x, y: y, width: w, height: h})) {
            batons[i].clickCount++;
            t = true;
        }
        if (batons[i].clickCount > 90) {
            fun();
            batons[i].clickCount = -20;
        }
    }
    return t;
};