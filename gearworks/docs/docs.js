const varNames = [
'x',
'y',
'z',
'w',
'a',
'b',
'c',
];
const varType = [
'str',
'int',
'float',
'bool',
];


    for(let i in varNames)
    {
        document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(i + ",", '<span class="var">' + i +'</span> '+ ',');
        document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(i + ")", '<span class="var">' + i +'</span>' + ')');
    }
    for(let i in varType)
    {
        document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(i, '<span class="vartype">' + i + '</span>');
        document.getElementsByClassName('container')[0].innerHTML = document.getElementsByClassName('container')[0].innerHTML.replaceAll(i, '<span class="vartype">' + i + '</span>');
    }


function createTag(type, inner)
{
   return document.createElement(type).appendChild(document.createTextNode(inner));
}


document.head.appendChild(createTag('style', `
.var{
color:skyblue;
{
.vartype{
color:orange;
}
`));


