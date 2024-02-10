// Ace
var editor = ace.edit("editor");

let langTools = ace.require("ace/ext/language_tools");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
});

editor.setTheme("ace/theme/tomorrow_night_eighties");
editor.session.setMode("ace/mode/javascript");

/*
.gwx File format

Special Symbols:
←→↭

META
Extention Title + Author
Overveiw + Color
Js Content
Docs (Overveiw of objs + Function Docs)
END
*/

// Exporting gwx files
function gw_exportGwx() {
    let txt = "←!DOCTYPE↭gwx→";
    txt += "←META↭" + Date().toString() + "→";
    txt += "←TITLE↭" + document.getElementById("name").value + "↭" + document.getElementById("author").value + "→";
    txt += "←OVERVEIW↭" + document.getElementById("overveiw").value + "↭" + document.getElementById("color").value + "→";
    txt += "←JSCONTENT↭" + editor.getValue() + "→";
    txt += "←DOCUMENTATION↭" + document.getElementById("docs").value + "→"; 
    txt += "←END→";

    return txt;
}

function gw_exportFromEci() {
    let file = gw_exportGwx();
    file = file.replaceAll("#", "e");
    gw_download(document.getElementById("name").value + ".gwx", file);
}

function gw_importToEci(xtn) {
    document.getElementById("name").value = xtn.name;
    document.getElementById("author").value = xtn.author;
    document.getElementById("overveiw").value = xtn.overveiw.replaceAll("<br>", "\n");
    document.getElementById("color").value = xtn.color;
    document.getElementById("docs").value = xtn.docs.replaceAll("<br>", "\n");
    editor.setValue(xtn.js);
}

document.getElementById("import").addEventListener("change", function() {
    const ext = this.files[0].name.split(".")[1];

    if (ext !== "gwx") {
        alert("Sorry, that isn't a valid Gearworks extention file (.gwx)!");
        return;
    }
    var gw_reader = new FileReader();
    gw_reader.onload = function(e) {
        let xten = gw_readExtentionFile(e.target.result);
        gw_importToEci(xten);
    };
    gw_reader.readAsText(this.files[0]);
});
