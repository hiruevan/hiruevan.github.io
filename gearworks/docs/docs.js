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
const bdy = document.body;


for(let i in varNames)
{
    bdy.innerHtml.replaceAll(i + ",", '<span class="var">' + i +'</span> '+ ',');
    bdy.innerHtml.replaceAll(i + ")", '<span class="var">' + i +'</span>' + ')');
}
for(let i in vartype)
{
    bdy.innerHtml.replaceAll(i, '<span class="vartype">' + i + '</span>');
    bdy.innerHtml.replaceAll(i, '<span class="vartype">' + i + '</span>');
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



