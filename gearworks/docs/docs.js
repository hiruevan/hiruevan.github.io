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


for(v in varNames)
{
    bdy.innerHtml.replaceAll(v + ",", '<span class="var">'+v+'</span>'+',');
    bdy.innerHtml.replaceAll(v + ")", '<span class="var">'+v+'</span>'+')');
}
for(t in vartype)
{
    bdy.innerHtml.replaceAll(v, '<span class="vartype">'+t+'</span>');
    bdy.innerHtml.replaceAll(v, '<span class="vartype">'+t+'</span>');
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



