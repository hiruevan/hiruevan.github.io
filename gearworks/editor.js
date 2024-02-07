// Toggles sidebar (With css animation)
function gw_toggleSideBar() {
    if (document.getElementsByClassName('side-bar-control')[0].textContent === "◀") {
        document.getElementsByClassName('side-bar')[0].classList.add('side-bar-in');
        document.getElementsByClassName('side-bar')[0].classList.remove('side-bar-out');
        document.getElementById('editor').style.left = "2%"
        document.getElementsByClassName('side-bar-control')[0].textContent = "▶";

    } else {
        document.getElementsByClassName('side-bar')[0].classList.add('side-bar-out');
        document.getElementsByClassName('side-bar')[0].classList.remove('side-bar-in');
        document.getElementById('editor').style.left = "17%"
        document.getElementsByClassName('side-bar-control')[0].textContent = "◀";

    }
}

// Sidebar tabs
function gw_switchToConsole() {
    document.getElementsByClassName("tab")[1].classList.add("selected");
    document.getElementsByClassName("tab")[0].classList.remove("selected");
    document.getElementsByClassName("docs")[0].classList.add("hidden");
    document.getElementsByClassName("console")[0].classList.remove("hidden");
}

function gw_switchToDocs() {
    document.getElementsByClassName("tab")[0].classList.add("selected");
    document.getElementsByClassName("tab")[1].classList.remove("selected");
    document.getElementsByClassName("console")[0].classList.add("hidden");
    document.getElementsByClassName("docs")[0].classList.remove("hidden");
}

function gw_stripHTMLTags(str) {
    str = str.toString();
    str = str.replaceAll("<br><div>", "\n");
    str = str.replaceAll("<div><br>", "\n");
    str = str.replaceAll("<div><div>", "\n");
    str = str.replaceAll("<br>", "\n");
    str = str.replaceAll("<div>", "\n");
    str = str.replaceAll("&nbsp;", " ");
    str = str.replaceAll("&lt;", "<");
    str = str.replaceAll("&gt;", ">");
    return str.replaceAll(/<[^>]*>/g, '');
}

// Text Editor Zoom code
let gw_codeZoom = 2;
let gw_zoomClasses = ["xsmall", "small", "norm", "large", "xlarge"];
function gw_zoomIn() {
    gw_codeZoom++;
    document.getElementsByClassName("zoom")[1].classList.remove("disabled");
    if (gw_codeZoom === 4) {
        document.getElementsByClassName("zoom")[0].classList.add("disabled");
    } else {
        if (gw_codeZoom > 4) {
            gw_codeZoom = 4;
            return;
        }
        document.getElementsByClassName("zoom")[0].classList.remove("disabled");
    }
    document.getElementsByClassName("editor-text")[0].classList.remove(gw_zoomClasses[gw_codeZoom-1]);
    document.getElementsByClassName("editor-text")[0].classList.add(gw_zoomClasses[gw_codeZoom]);
}

function gw_zoomOut() {
    gw_codeZoom--;
    document.getElementsByClassName("zoom")[0].classList.remove("disabled");
    if (gw_codeZoom === 0) {
        document.getElementsByClassName("zoom")[1].classList.add("disabled");
    } else {
        if (gw_codeZoom < 0) {
            codeZoom = 0;
            return;
        }
        document.getElementsByClassName("zoom")[1].classList.remove("disabled");
    }
    document.getElementsByClassName("editor-text")[0].classList.remove(gw_zoomClasses[gw_codeZoom+1]);
    document.getElementsByClassName("editor-text")[0].classList.add(gw_zoomClasses[gw_codeZoom]);
}

function gw_error(log) {
    let id = Math.random()*97249857;
    toLog = log.replaceAll("\n", "<br>");
    document.getElementsByClassName("console-logs")[0].innerHTML += "<div id='" + id + "' class='error log'>" + toLog + "</div>";
    gw_switchToConsole();
    gw_escapeFullscreen();
    if (document.getElementsByClassName('side-bar-control')[0].textContent === "▶") {
        gw_toggleSideBar();
    }
    let aTag = document.createElement("a");
    aTag.href = "#" + id;
    document.body.appendChild(aTag);
    aTag.click();
}

function gw_log(log) {
    toLog = log.replaceAll("\n", "<br>");
    document.getElementsByClassName("console-logs")[0].innerHTML += "<div class='log'>" + toLog + "</div>";
}

function gw_warn(log) {
    toLog = log.replaceAll("\n", "<br>");
    document.getElementsByClassName("console-logs")[0].innerHTML += "<div class='warn log'>" + toLog + "</div>";
}

function gw_clearConsole() {
    document.getElementsByClassName("console-logs")[0].innerHTML = "";
}

function primeScriptForErrors(code) {
    let raw = "try {" + code + "\n} catch (e) {gw_error(e)}";
    return raw;
}

function gw_run() {
    let script = document.createElement("script");
    script.classList.add("canvas-script");
    let raw = editor.getValue();
    raw = primeScriptForErrors(raw);
    script.innerHTML = raw;
    document.body.appendChild(script);
}

function gw_fullscreen() {
    gw_goInFullscreen(document.getElementsByClassName("canvas-div")[0]);
    document.getElementsByClassName("right")[0].textContent = "Escape";
    document.getElementsByClassName("right")[0].setAttribute("onclick", "gw_escapeFullscreen();");
}

function gw_escapeFullscreen() {
    gw_goOutFullscreen(document.getElementsByClassName("canvas-div")[0]);
    document.getElementsByClassName("right")[0].textContent = "Fullscreen";
    document.getElementsByClassName("right")[0].setAttribute("onclick", "gw_fullscreen();");
}

/* Get into full screen */
var gw_goInFullscreen = function(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
    element.classList.add("fullscreen");
};

/* Get out of full screen */
var gw_goOutFullscreen = function(element) {
	if(document.exitFullscreen) {
		document.exitFullscreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if(document.msExitFullscreen) {
		document.msExitFullscreen();
	}
    element.classList.remove("fullscreen");
};

/* Is currently in full screen or not */
var gw_isFullScreen = function() {
	var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
	// If no element is in full-screen
	if(full_screen_element === null) {
		return false;
	} else {
		return true;
	}
};

// Check to escape fullscreen
if (document.addEventListener) {
    document.addEventListener('fullscreenchange', gw_exitHandler, false);
    document.addEventListener('mozfullscreenchange', gw_exitHandler, false);
    document.addEventListener('MSFullscreenChange', gw_exitHandler, false);
    document.addEventListener('webkitfullscreenchange', gw_exitHandler, false);
}

function gw_exitHandler() {
    if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        // When the user exits fullscreen
        gw_escapeFullscreen();
    }
}





// Place starting console
gw_log("The logs your programs make will apear here, in the console. This also includes errors that Gear Works catches, to make bug fixing easier for you!");
gw_warn("Keep in mind that not all errors will register and be loged in this console, the program may not work in the first place.")
