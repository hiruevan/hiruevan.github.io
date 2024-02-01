const varNames = ['x', 'y', 'z', 'w', 'a', 'b', 'c'];
const varType = ['str', 'int', 'float', 'bool', 'color'];
const objs = ['gearWorks', 'draw', 'Math'];

for (let i in varNames) {
    document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(varNames[i] + ",", '<span class="var">' + varNames[i] + '</span> ' + ',');
    document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(varNames[i] + ")", '<span class="var">' + varNames[i] + '</span>' + ')');
}

for (let i in varType) {
    document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(varType[i], '<span class="vartype">' + varType[i] + '</span>');
    document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(varType[i], '<span class="vartype">' + varType[i] + '</span>');
}

for (let i in objs) {
    document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(objs[i], '<span class="objs">' + objs[i] + '</span>');
    document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(objs[i], '<span class="objs">' + objs[i] + '</span>');
}

function createTag(type, inner) {
    const tag = document.createElement(type);
    tag.appendChild(document.createTextNode(inner));
    return tag;
}

document.head.appendChild(createTag('style', `
.var{
    color: #33ECFF;
}
.vartype{
    color: #FF9012;
}
.objs {
    color: #9e3f00;
}
`));
