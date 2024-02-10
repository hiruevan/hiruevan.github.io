// Downloading
function gw_download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain,' + text);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

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

function gw_readExtentionFile(txt) {
    let ext = {
        name: "",
        author: "",
        js: "",
        color: "",
        overveiw: "",
        color: "",
        docs: "",
        date: ""
    };

    if (!txt[13] == "x" || !txt[1] == "!") {
        alert("An error occured loading the Extention!")
        return;
    }

    for (let i = 0; i < txt.length; i++) {
        if (txt[i] == "←") {
            i++;
            // Document
            if (txt[i] == "!") {
                while (txt[i] != "→") {
                    i++;
                }
            }
            // Meta
            if (txt[i] == "M") {
                while (txt[i] != "↭") {
                    i++;
                }
                i++;
                while (txt[i] != "→") {
                    ext.date += txt[i];
                    i++;
                }
            }
            // Title
            if (txt[i] == "T") {
                while (txt[i] != "↭") {
                    i++;
                }
                i++;
                while (txt[i] != "↭") {
                    ext.name += txt[i];
                    i++;
                }
                i++;

                // Author
                while (txt[i] != "→") {
                    ext.author += txt[i];
                    i++;
                }
            }
            // Overveiw
            if (txt[i] == "O") {
                while (txt[i] != "↭") {
                    i++;
                }
                i++;
                while (txt[i] != "↭") {
                    ext.overveiw += txt[i];
                    i++;
                }
                i++;
                while (txt[i] != "→") {
                    if (txt[i] == "↯") {
                        ext.color += "#";
                    } else {
                        ext.color += txt[i];
                    }
                    
                    i++;
                }
            }
            // Js content
            if (txt[i] == "J") {
                while (txt[i] != "↭") {
                    i++;
                }
                i++;
                while (txt[i] != "→") {
                    ext.js += txt[i];
                    i++;
                }
            }
            // Docs
            if (txt[i] == "D") {
                while (txt[i] != "↭") {
                    i++;
                }
                i++;
                while (txt[i] != "→") {
                    ext.docs += txt[i];
                    i++;
                }
            }
        }
    }

    ext.docs = ext.docs.replaceAll("\n", "<br>");
    ext.overveiw = ext.overveiw.replaceAll("\n", "<br>");

    return ext;
}
