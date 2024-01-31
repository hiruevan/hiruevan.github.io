const varNames = ['x', 'y', 'z', 'w', 'a', 'b', 'c'];
const varType = ['str', 'int', 'float', 'bool'];

for (let i in varNames) {
    document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(varNames[i] + ",", '<span class="var">' + varNames[i] + '</span> ' + ',');
    document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(varNames[i] + ")", '<span class="var">' + varNames[i] + '</span>' + ')');
}

for (let i in varType) {
    document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(varType[i], '<span class="vartype">' + varType[i] + '</span>');
    document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(varType[i], '<span class="vartype">' + varType[i] + '</span>');
}

function createTag(type, inner) {
    const tag = document.createElement(type);
    tag.appendChild(document.createTextNode(inner));
    return tag;
}

document.head.appendChild(createTag('style', `
.var{
    color: skyblue;
}
.vartype{
    color: orange;
}
`));