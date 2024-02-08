// The forever loop (Used by learning coders)
function forever() {}

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


// Console logging
function gw_error(log) {
    let id = Math.random()*97249857;
    toLog = String(log).replaceAll("\n", "<br>");
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
    gw_stop();
}

function gw_log(log) {
    toLog = String(log).replaceAll("\n", "<br>");
    document.getElementsByClassName("console-logs")[0].innerHTML += "<div class='log'>" + toLog + "</div>";
}

function gw_warn(log) {
    toLog = String(log).replaceAll("\n", "<br>");
    document.getElementsByClassName("console-logs")[0].innerHTML += "<div class='warn log'>" + toLog + "</div>";
}

function gw_clearConsole() {
    document.getElementsByClassName("console-logs")[0].innerHTML = "";
}

function primeScriptForErrors(code) {
    let raw = "try {" + code + "\n} catch (e) {gw_error(e)}";
    return raw;
}


// Mouse position handling
let mouse = {
    x: 0,
    y: 0
}
document.getElementById("cvs").addEventListener("mousemove", function(e) {
    let cvsWidth = (window.innerWidth*0.25 - 35);
    let leftCvsPos = (window.innerWidth - 35) - cvsWidth;
    mouse.x = e.clientX - leftCvsPos;
    mouse.x = Math.floor((mouse.x*800)/cvsWidth);
    if (mouse.x < 0) {
        mouse.x = 0;
    } else if (mouse.x > 800) {
        mouse.x = 800;
    }
    let cvsDivTop = (window.innerHeight*0.07 + 15)
    let topCvsPos =  cvsDivTop + 20;
    mouse.y = e.clientY - topCvsPos;
    mouse.y = Math.floor((mouse.y*800)/cvsWidth);
    if (mouse.y < 0) {
        mouse.y = 0;
    } else if (mouse.y > 800) {
        mouse.y = 800;
    }
    
});


// running code
function gw_run() {
    gw_stop();
    let script = document.createElement("script");
    script.classList.add("canvas-script");
    let raw = editor.getValue();
    raw = primeScriptForErrors(raw);
    script.innerHTML = raw;
    document.body.appendChild(script);
}

function gw_stop() {
    forever = function() {}
    gw_ctx.fillStyle = "white";
    gw_ctx.fillRect(0, 0, 800, 800);
    try {
        document.getElementsByClassName("canvas-script")[0].remove();
        console.log("Script Cleanup: Scripts cleaned.")
    } catch (e) {
        console.error("Script Cleanup: Scripts Cleaned; Nothing to remove.")
    }
}

// This repeats forever
function gw_repeat() {
    try {
        forever();
    } catch (e) {
        gw_error("Uncaught Error: " + e)
    }
    
    document.getElementById("m-x").textContent = mouse.x;
    document.getElementById("m-y").textContent = mouse.y;

    window.requestAnimationFrame(gw_repeat);
}

gw_repeat();

// Fullscreen
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
function gw_goOutFullscreen(element) {
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

// File (Saving, loading, etc)

function gw_toggleFileBox() {
    if (document.getElementsByClassName("file-button")[0].textContent.includes("▼")) {
    document.getElementsByClassName("file-box")[0].classList.remove("hidden");
    document.getElementsByClassName("file-button")[0].textContent = "File ▲";
    } else {
        document.getElementsByClassName("file-box")[0].classList.add("hidden");
        document.getElementsByClassName("file-button")[0].textContent = "File ▼";
    }
}

function gw_downloadProject() {

}

function gw_openProject() {
    if (!confirm("Are you sure you want to replace the current contents of the Editor?")) {
        return;
    }

    console.log("replace!");
}

function gw_packageProject() {

}


// Cabinet
let gw_cabinet = {
    imageNames: [],
    imageUrls: [],
    soundNames: [],
    soundUrls: []
};

// Images
document.getElementById('img-upload').addEventListener('change', function() {
    if (this.files && this.files[0]) {
        var img = document.getElementById('add-img');
        img.onload = () => {
            URL.revokeObjectURL(img.src);  // no longer needed, free memory
        }

        img.src = URL.createObjectURL(this.files[0]); // set src to blob url

        // Add list entry
        gw_cabinet.imageNames.push(this.files[0].name);

        imgToDataURL(img.src, function(url) {
            document.getElementsByClassName("uploaded-images")[0].innerHTML += "<img class='imported-image' src='" + url + "'><p>" + gw_cabinet.imageNames[gw_cabinet.imageNames.length - 1] + "</p>";
            gw_cabinet.imageUrls.push(url);
        }, 'png');
    }
});

function imgToDataURL(src, callback, filetype) {
    var image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = function(){
       var canvas = document.createElement('canvas');
       var context = canvas.getContext('2d');
       canvas.height = this.naturalHeight;
       canvas.width = this.naturalWidth;
       context.drawImage(this, 0, 0);
       var dataURL = canvas.toDataURL('image/' + filetype);
       callback(dataURL);
    };
    image.src = src;
}

// Sounds
document.getElementById('sound-upload').addEventListener('change', function() {
    if (this.files && this.files[0]) {
        // Add list entry
        gw_cabinet.soundNames.push(this.files[0].name);

        audioToBase64(this.files[0]).then(result => gw_addResult(result));

        
    }
});

function gw_addResult(r) {
    let url = r;
    document.getElementsByClassName("uploaded-sounds")[0].innerHTML += "<audio class='imported-sound' src='" + url + "' controls></audio><p>" + gw_cabinet.soundNames[gw_cabinet.soundNames.length - 1] + "</p>";
    gw_cabinet.soundUrls.push(url);
}

async function audioToBase64(audioFile) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(audioFile);
    });
}


// Place starting console
gw_log("The logs your programs make will appear here in the console. This also includes errors that Gearworks catches, to make bug fixing easier for you!");
gw_warn("Keep in mind that not all errors will register and be logged in this console. The program just may not even work in the first place.")
