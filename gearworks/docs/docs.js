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
const bdy = document.body

function addspans()
{
    for(let i in varNames)
    {
        bdy.innerHTML = bdy.innerHTML.replaceAll(i + ",", '<span class="var">' + i +'</span> '+ ',');
        bdy.innerHTML = bdy.innerHTML.replaceAll(i + ")", '<span class="var">' + i +'</span>' + ')');
    }
    for(let i in vartype)
    {
        bdy.innerHTML = bdy.innerHTML.replaceAll(i, '<span class="vartype">' + i + '</span>');
        bdy.innerHTML = bdy.innerHTML.replaceAll(i, '<span class="vartype">' + i + '</span>');
    }
}


function createTag(type, innerHtml)
{
   return document.createElement(type).appendChild(document.createTextNode(innerHTML));
}


document.head.appendChild(createTag('style', `
.var{
color:skyblue;
{
.vartype{
color:orange;
}
`));

addspans();

