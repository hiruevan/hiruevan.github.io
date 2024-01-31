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
        document.body.innerHTML = document.body.innerHTML.replaceAll(i + ",", '<span class="var">' + i +'</span> '+ ',');
        document.body.innerHTML = document.body.innerHTML.replaceAll(i + ")", '<span class="var">' + i +'</span>' + ')');
    }
    for(let i in vartype)
    {
        document.body.innerHTML = document.body.innerHTML.replaceAll(i, '<span class="vartype">' + i + '</span>');
        document.body.innerHTML = document.body.innerHTML.replaceAll(i, '<span class="vartype">' + i + '</span>');
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


