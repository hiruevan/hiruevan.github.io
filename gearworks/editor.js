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
        text = text.replaceAll(word, "<" + classifier + ">" + word + "</" + classifier + ">");
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
    return str.replaceAll(/<[^>]*>/g, '');
}

function colorComments(str) {
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
        if (str[i] === firstOpener && openStr) {
            ret += str[i] + "</str>";
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
    $('#edit').css('min-height', $('#edit').height());
    $('#edit').html('// Welcome to the Gear Words Editor!');
    var currentHeight = $('#edit').height();
    var lineHeight = currentHeight;
    $('#edit').on("keyup keydown", function(){
        setColors();
        if($(this).height()!=currentHeight){
                lineHeight = $("#zoom-placeholder").height();
                currentHeight = $(this).height();
                var lines = currentHeight/lineHeight;
                $('#nums').html('');
            for (i = 1; i < lines+1; i++) {
                $('#nums').append('<span>'+i+'</span>');
            }
        }
    })
})


function setColors() {
    let raw = document.getElementById("edit").innerHTML;

    // strip html
    raw = stripHTMLTags(raw);

    // Key-words
    raw = colorWord(raw, "function ", "keyword");
    raw = colorWord(raw, "let ", "keyword");
    raw = colorWord(raw, "var ", "keyword");
    raw = colorWord(raw, "const ", "keyword");
    raw = colorWord(raw, "break", "keyword");
    raw = colorWord(raw, "return", "keyword");
    raw = colorWord(raw, "undefined", "keyword");
    raw = colorWord(raw, "in ", "keyword");
    raw = colorWord(raw, "null", "keyword");
    raw = colorWord(raw, "true", "keyword");
    raw = colorWord(raw, "false", "keyword");
    raw = colorWord(raw, "try", "keyword");
    raw = colorWord(raw, "catch", "keyword");
    raw = colorWord(raw, "if", "keyword");
    raw = colorWord(raw, "else", "keyword");
    raw = colorWord(raw, "while", "keyword");
    raw = colorWord(raw, "for", "keyword");
    raw = colorWord(raw, "this", "keyword");
    raw = colorWord(raw, "delete ", "keyword");
    raw = colorWord(raw, "float ", "keyword");
    raw = colorWord(raw, "new ", "keyword");
    raw = colorWord(raw, "static ", "keyword");

    raw = colorWord(raw, "=", "operator");
    raw = colorWord(raw, "+", "operator");
    raw = colorWord(raw, "-", "operator");
    raw = colorWord(raw, "1", "operator");
    raw = colorWord(raw, "2", "operator");
    raw = colorWord(raw, "3", "operator");
    raw = colorWord(raw, "4", "operator");
    raw = colorWord(raw, "5", "operator");
    raw = colorWord(raw, "6", "operator");
    raw = colorWord(raw, "8", "operator");
    raw = colorWord(raw, "9", "operator");
    raw = colorWord(raw, "%", "operator");

    raw = colorWord(raw, ";", "colon");
    raw = colorWord(raw, ":", "colon");
    
    // Key-phrases
    raw = colorComments(raw);
    raw = colorStrs(raw);

    // return to html
    raw = raw.replaceAll(" ", "&nbsp;");
    raw = raw.replaceAll("\n", "<br>");

    document.getElementById("display").innerHTML = raw;
}
