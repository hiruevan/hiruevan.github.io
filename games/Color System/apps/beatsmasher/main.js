// Load other data
runJsFile("./apps/beatsmasher/logic.js", "runningApp");
runJsFile("./apps/beatsmasher/rendering.js", "runningApp");

function beatsmasher() {
    try {
        gameLoop();
    } catch (e) {
        loading();
    }
};

function gameLoop() {
    // game
    
    logic();
    rendering();
};