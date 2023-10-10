// Toggles sidebar (With css animation)
function toggleSideBar() {
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

function colorWord(text, word, classifier) {
    if (text.includes(word)) {
        if (classifier === "keyword") {
            text = text.replaceAll(word + " ", "<keyword>" + word + "</keyword> ");
            text = text.replaceAll(word + ";", "<keyword>" + word + "</keyword>;");
            text = text.replaceAll(word + ":", "<keyword>" + word + "</keyword>:");
            text = text.replaceAll(word + ".", "<keyword>" + word + "</keyword>.");
            text = text.replaceAll(word + "{", "<keyword>" + word + "</keyword>{");
            text = text.replaceAll(word + "(", "<keyword>" + word + "</keyword>(");
            text = text.replaceAll(word + "[", "<keyword>" + word + "</keyword>[");
        } else if (classifier === "loperator") {
            text = text.replaceAll(word + " ", "<loperator>" + word + "</loperator> ");
            text = text.replaceAll(word + ";", "<loperator>" + word + "</loperator>;");
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

function stripHTMLTags(str) {
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

function colorComments(s) {
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

function colorStrs(str) {
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
let codeZoom = 2;
let zoomClasses = ["xsmall", "small", "norm", "large", "xlarge"];
function zoomIn() {
    codeZoom++;
    document.getElementsByClassName("zoom")[1].classList.remove("disabled");
    if (codeZoom === 4) {
        document.getElementsByClassName("zoom")[0].classList.add("disabled");
    } else {
        if (codeZoom > 4) {
            codeZoom = 4;
            return;
        }
        document.getElementsByClassName("zoom")[0].classList.remove("disabled");
    }
    document.getElementsByClassName("code-text")[0].classList.remove(zoomClasses[codeZoom-1]);
    document.getElementsByClassName("code-text")[0].classList.add(zoomClasses[codeZoom]);
}

function zoomOut() {
    codeZoom--;
    document.getElementsByClassName("zoom")[0].classList.remove("disabled");
    if (codeZoom === 0) {
        document.getElementsByClassName("zoom")[1].classList.add("disabled");
    } else {
        if (codeZoom < 0) {
            codeZoom = 0;
            return;
        }
        document.getElementsByClassName("zoom")[1].classList.remove("disabled");
    }
    document.getElementsByClassName("code-text")[0].classList.remove(zoomClasses[codeZoom+1]);
    document.getElementsByClassName("code-text")[0].classList.add(zoomClasses[codeZoom]);
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
        textAreaAdjust(this);
        setColors();
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



function setColors() {
    let raw = document.getElementById("edit").value;

    // strip html
    //raw = stripHTMLTags(raw);

    // Key-words
    // raw = colorWord(raw, "function ", "lKeyword");
    // raw = colorWord(raw, "let ", "lKeyword");
    // raw = colorWord(raw, "var ", "lKeyword");
    // raw = colorWord(raw, "const ", "lKeyword");
    // raw = colorWord(raw, "in ", "lKeyword");
    // raw = colorWord(raw, "delete ", "lKeyword");
    // raw = colorWord(raw, "float ", "lKeyword");
    // raw = colorWord(raw, "new ", "lKeyword");
    // raw = colorWord(raw, "static ", "lKeyword");
    
    // // These keywords cannot have anything but a ;, ., or \n after them
    // raw = colorWord(raw, "break", "keyword");
    // raw = colorWord(raw, "return", "keyword");
    // raw = colorWord(raw, "undefined", "keyword");
    // raw = colorWord(raw, "null", "keyword");
    // raw = colorWord(raw, "true", "keyword");
    // raw = colorWord(raw, "false", "keyword");
    // raw = colorWord(raw, "try", "keyword");
    // raw = colorWord(raw, "catch", "keyword");
    // raw = colorWord(raw, "if", "keyword");
    // raw = colorWord(raw, "else", "keyword");
    // raw = colorWord(raw, "while", "keyword");
    // raw = colorWord(raw, "for", "keyword");
    // raw = colorWord(raw, "this", "keyword");

    // // Operators
    // // raw = colorWord(raw, "0", "loperator");
    // // raw = colorWord(raw, "1", "loperator");
    // // raw = colorWord(raw, "2", "loperator");
    // // raw = colorWord(raw, "3", "loperator");
    // // raw = colorWord(raw, "4", "loperator");
    // // raw = colorWord(raw, "5", "loperator");
    // // raw = colorWord(raw, "6", "loperator");
    // // raw = colorWord(raw, "7", "loperator");
    // // raw = colorWord(raw, "8", "loperator");
    // // raw = colorWord(raw, "9", "loperator");

    // raw = colorWord(raw, "=", "operator");
    // raw = colorWord(raw, "+", "operator");
    // raw = colorWord(raw, "-", "operator");
    // raw = colorWord(raw, "%", "operator");

    // // Puncuation (Muted Color)
    // raw = colorWord(raw, ";", "punctuation");
    // raw = colorWord(raw, ":", "punctuation");
    // raw = colorWord(raw, ".", "punctuation");
    // raw = colorWord(raw, ",", "punctuation");
    
    // Key-phrases
    
    raw = colorStrs(raw);
    raw = colorComments(raw);

    // return to html
    raw = raw.replaceAll(" ", "&nbsp;");
    raw = raw.replaceAll("\t", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    raw = raw.replaceAll("\n", "<br>");

    document.getElementById("display").innerHTML = raw + "<hidden>stretch</hidden>";
}

function textAreaAdjust() {
    let el = document.getElementById("edit");
    let dis = document.getElementById("display");
    let bounding = dis.getBoundingClientRect();
    el.style.height = (25+Math.ceil(bounding.height)) + "px";
    el.style.width = (25+Math.ceil(bounding.width)) + "px";
}

function run() {
    let script = document.createElement("script");
    script.classList.add("canvas-script");
    script.innerHTML = document.getElementById("edit").value;
    document.body.appendChild(script);
}

function fullscreen() {
    //goInFullscreen(document.getElementsByClassName("code-space")[0]);
}


/* Get into full screen */
var goInFullscreen = function(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
};

/* Get out of full screen */
var goOutFullscreen = function() {
	if(document.exitFullscreen) {
		document.exitFullscreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if(document.msExitFullscreen) {
		document.msExitFullscreen();
	}
};

/* Is currently in full screen or not */
var isFullScreen = function() {
	var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
	// If no element is in full-screen
	if(full_screen_element === null) {
		return false;
	} else {
		return true;
	}
};
