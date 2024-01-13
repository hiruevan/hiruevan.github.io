// Toggles sidebar (With css animation)
function gw_toggleSideBar() {
    if (document.getElementsByClassName('side-bar-control')[0].textContent === "◀") {
        document.getElementsByClassName('side-bar')[0].classList.add('side-bar-in');
        document.getElementsByClassName('side-bar')[0].classList.remove('side-bar-out');
        document.getElementsByClassName('code-space')[0].classList.add('code-large');
        document.getElementsByClassName('code-space')[0].classList.remove('code-small');
        document.getElementsByClassName('side-bar-control')[0].textContent = "▶";

    } else {
        document.getElementsByClassName('side-bar')[0].classList.add('side-bar-out');
        document.getElementsByClassName('side-bar')[0].classList.remove('side-bar-in');
        document.getElementsByClassName('code-space')[0].classList.add('code-small');
        document.getElementsByClassName('code-space')[0].classList.remove('code-large');
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


// Colors code
function gw_colorWord(text, word, classifier) {
    if (text.includes(word)) {
        if (classifier === "keyword") {
            text = text.replaceAll(word + " ", "<keyword>" + word + "</keyword> ");
            text = text.replaceAll(word + ";", "<keyword>" + word + "</keyword>;");
            text = text.replaceAll(word + ":", "<keyword>" + word + "</keyword>:");
            text = text.replaceAll(word + ".", "<keyword>" + word + "</keyword>.");
            text = text.replaceAll(word + "{", "<keyword>" + word + "</keyword>{");
            text = text.replaceAll(word + "(", "<keyword>" + word + "</keyword>(");
            text = text.replaceAll(word + "[", "<keyword>" + word + "</keyword>[");
        } else if (classifier === "gwkey") {
            text = text.replaceAll(word + " ", "<gwkey>" + word + "</gwkey> ");
            text = text.replaceAll(word + ";", "<gwkey>" + word + "</gwkey>;");
            text = text.replaceAll(word + ".", "<gwkey>" + word + "</gwkey>.");
        } else if (classifier === "loperator") {
            text = text.replaceAll(word + " ", "<loperator>" + word + "</loperator> ");
            text = text.replaceAll(word + ";", "<loperator>" + word + "</loperator>;");
            text = text.replaceAll(word + ")", "<loperator>" + word + "</loperator>)");
            text = text.replaceAll(word + ",", "<loperator>" + word + "</loperator>,");
            text = text.replaceAll(word + "*", "<loperator>" + word + "</loperator>*");
            text = text.replaceAll(word + "=", "<loperator>" + word + "</loperator>=");
            text = text.replaceAll(word + "+", "<loperator>" + word + "</loperator>+");
            text = text.replaceAll(word + "-", "<loperator>" + word + "</loperator>-");
            text = text.replaceAll(word + ">", "<loperator>" + word + "</loperator>>");
            text = text.replaceAll(word + "<", "<loperator>" + word + "</loperator><");
            text = text.replaceAll(word + "/", "<loperator>" + word + "</loperator>/");
            text = text.replaceAll(word + "0", "<loperator>" + word + "</loperator>0");
            text = text.replaceAll(word + "1", "<loperator>" + word + "</loperator>1");
            text = text.replaceAll(word + "2", "<loperator>" + word + "</loperator>2");
            text = text.replaceAll(word + "3", "<loperator>" + word + "</loperator>3");
            text = text.replaceAll(word + "4", "<loperator>" + word + "</loperator>4");
            text = text.replaceAll(word + "5", "<loperator>" + word + "</loperator>5");
            text = text.replaceAll(word + "6", "<loperator>" + word + "</loperator>6");
            text = text.replaceAll(word + "7", "<loperator>" + word + "</loperator>7");
            text = text.replaceAll(word + "8", "<loperator>" + word + "</loperator>8");
            text = text.replaceAll(word + "9", "<loperator>" + word + "</loperator>9");

        } else {
            text = text.replaceAll(word, "<" + classifier + ">" + word + "</" + classifier + ">");
        }
    }
    return text;
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

function gw_colorComments(s) {
    let str = s;
    let ret = "";
    let openComment = false;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "/" && str[i+1] === "/" && !openComment) {
            ret += "<comment>";
            openComment = true;
        }
        if (str[i] === "\n" && openComment) {
            ret += "</comment>";
            openComment = false;
        }
        ret += str[i];
    }
    if (openComment) {
        ret += "</comment>"
    }
    str = ret;
    ret = "";
    openComment = false;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "/" && str[i+1] === "*" && !openComment) {
            ret += "<comment>";
            openComment = true;
        }
        if (str[i] === "*" && str[i+1] === "/" && openComment) {
            ret += "*/</comment>";
            i += 2;
            if (i === str.length) {
                break;
            }
            openComment = false;
        }
        ret += str[i];
    }
    if (openComment) {
        ret += "</comment>"
    }
    return ret;
}

function gw_colorStrs(str) {
    let ret = "";
    let openStr = false;
    let firstOpener;
    for (let i = 0; i < str.length; i++) {
        if ((str[i] === "'" || str[i] === '"') && !openStr) {
            ret += "<str>" + str[i];
            firstOpener = str[i];
            i++;
            if (i === str.length) {
                break;
            }
            openStr = true;
        }
        if (str[i] === "\\" && openStr) {
            let r = str[i+1];
            if (i+1 === str.length) {
                r = "";
            }
            ret += "<strkeyword>\\" + r + "</strkeyword>";
            i += 2;
            if (i >= str.length) {
                break;
            }
        }
        if ((str[i] === firstOpener || str[i] === "\n") && openStr) {
            if (str[i] === "\n") {
                ret += "<error>" + firstOpener + "</error><hidden>";
                i--;
            }
            ret += str[i] + "</str>";

            if (str[i] === "\n") {
                ret += "</hidden>";
            }
            
            i++;
            if (i === str.length) {
                break;
            }
            openStr = false;
        }
        ret += str[i];
    }
    if (openStr) {
        ret += "</str>"
    }
    return ret;
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
    document.getElementsByClassName("code-text")[0].classList.remove(gw_zoomClasses[gw_codeZoom-1]);
    document.getElementsByClassName("code-text")[0].classList.add(gw_zoomClasses[gw_codeZoom]);
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
    document.getElementsByClassName("code-text")[0].classList.remove(gw_zoomClasses[gw_codeZoom+1]);
    document.getElementsByClassName("code-text")[0].classList.add(gw_zoomClasses[gw_codeZoom]);
}


// Lines in editor (Credit to stack overflow post https://stackoverflow.com/questions/60106046/how-to-display-row-number-next-to-each-row-on-contenteditable-div)
$(document).ready(function(){
    $('#edit').value = '// Welcome to the Gear Words Editor!';
    var currentHeight = $('#edit').height();
    var lineHeight = currentHeight;
    $("#edit").on("keyup", function(e) {
        if (e.key == 'Tab') {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;
        
            // set textarea value to: text before caret + tab + text after caret
            this.value = this.value.substring(0, start) +
              "\t" + this.value.substring(end);
        
            // put caret at right position again
            this.selectionStart =
            this.selectionEnd = start + 1;
        }
    })
    $('#edit').on("keyup keydown", function(e){
        if (e.key == 'Tab') {
            e.preventDefault();
            
        }
        gw_textAreaAdjust();
        gw_setColors();
        if($("#display").height()!=currentHeight){
                lineHeight = $("#zoom-placeholder").height();
                currentHeight = $("#display").height();
                var lines = currentHeight/lineHeight;
                $('#nums').html('');
                $('#nums').append('<span>1</span>');
            for (i = 2; i < lines+1; i++) {
                $('#nums').append('<span>'+i+'</span>');
            }
            
        }
    }) 
});



function gw_setColors() {
    let raw = document.getElementById("edit").value;

    // Key-words
    raw = gw_colorWord(raw, "function ", "lKeyword");
    raw = gw_colorWord(raw, "let ", "lKeyword");
    raw = gw_colorWord(raw, "var ", "lKeyword");
    raw = gw_colorWord(raw, "const ", "lKeyword");
    raw = gw_colorWord(raw, "in ", "lKeyword");
    raw = gw_colorWord(raw, "delete ", "lKeyword");
    raw = gw_colorWord(raw, "float ", "lKeyword");
    raw = gw_colorWord(raw, "new ", "lKeyword");
    raw = gw_colorWord(raw, "static ", "lKeyword");
    
    // These keywords cannot have anything but a ;, ., or \n after them
    raw = gw_colorWord(raw, "break", "keyword");
    raw = gw_colorWord(raw, "return", "keyword");
    raw = gw_colorWord(raw, "undefined", "keyword");
    raw = gw_colorWord(raw, "null", "keyword");
    raw = gw_colorWord(raw, "true", "keyword");
    raw = gw_colorWord(raw, "false", "keyword");
    raw = gw_colorWord(raw, "try", "keyword");
    raw = gw_colorWord(raw, "catch", "keyword");
    raw = gw_colorWord(raw, "if", "keyword");
    raw = gw_colorWord(raw, "else", "keyword");
    raw = gw_colorWord(raw, "while", "keyword");
    raw = gw_colorWord(raw, "for", "keyword");
    raw = gw_colorWord(raw, "this", "keyword");

    // Gear works keywords
    raw = gw_colorWord(raw, "draw", "gwkey");
    raw = gw_colorWord(raw, "gearWorks", "gwkey");

    // Operators
    raw = gw_colorWord(raw, "0", "loperator");
    raw = gw_colorWord(raw, "1", "loperator");
    raw = gw_colorWord(raw, "2", "loperator");
    raw = gw_colorWord(raw, "3", "loperator");
    raw = gw_colorWord(raw, "4", "loperator");
    raw = gw_colorWord(raw, "5", "loperator");
    raw = gw_colorWord(raw, "6", "loperator");
    raw = gw_colorWord(raw, "7", "loperator");
    raw = gw_colorWord(raw, "8", "loperator");
    raw = gw_colorWord(raw, "9", "loperator");

    raw = gw_colorWord(raw, "=", "operator");
    raw = gw_colorWord(raw, "+", "operator");
    raw = gw_colorWord(raw, "-", "operator");
    raw = gw_colorWord(raw, "%", "operator");

    // Puncuation (Muted Color)
    raw = gw_colorWord(raw, ";", "punctuation");
    raw = gw_colorWord(raw, ":", "punctuation");
    raw = gw_colorWord(raw, ".", "punctuation");
    raw = gw_colorWord(raw, ",", "punctuation");
    
    // Key-phrases
    
    raw = gw_colorStrs(raw);
    raw = gw_colorComments(raw);

    // return to html
    raw = raw.replaceAll(" ", "&nbsp;");
    raw = raw.replaceAll("\t", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    raw = raw.replaceAll("\n", "<br>");

    document.getElementById("display").innerHTML = raw + "<hidden>stretch</hidden>";
}

function gw_textAreaAdjust() {
    let el = document.getElementById("edit");
    let dis = document.getElementById("display");
    let bounding = dis.getBoundingClientRect();
    el.style.height = (25+Math.ceil(bounding.height)) + "px";
    el.style.width = (25+Math.ceil(bounding.width)) + "px";
}

function gw_error(log) {
    let id = Math.random()*97249857;
    document.getElementsByClassName("console-logs")[0].innerHTML += "<div id='" + id + "' class='error log'>" + log + "</div>";
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
    document.getElementsByClassName("console-logs")[0].innerHTML += "<div class='log'>" + log + "</div>";
}

function gw_warn(log) {
    document.getElementsByClassName("console-logs")[0].innerHTML += "<div class='warn log'>" + log + "</div>";
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
    let raw = document.getElementById("edit").value;
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
