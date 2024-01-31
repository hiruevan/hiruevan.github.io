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
const b = document.body;


for(v in varNames)
{
    b.innerHtml.replaceAll(v + ",", '<span class="var">'+v+'</span>'+',');
    b.innerHtml.replaceAll(v + ")", '<span class="var">'+v+'</span>'+')');
}
for(t in vartype)
{
    b.innerHtml.replaceAll(v, '<span class="vartype">'+t+'</span>');
    b.innerHtml.replaceAll(v, '<span class="vartype">'+t+'</span>');
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
`);



