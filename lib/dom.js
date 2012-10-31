function DIV(attrs){
  return dom('div', attrs, arguments);
}

function BLOCKQUOTE(attrs, children){
  return dom('blockquote', attrs, arguments);
}

function H2(attrs){
  return dom('h2', attrs, arguments);
}

function ABBR(attrs){
  return dom('abbr', attrs, arguments);
}

function TIME(attrs){
  return dom('time', attrs, arguments);
}

function SPAN(attrs){
  return dom('span', attrs, arguments);
}

function P(attrs){
  return dom('p', attrs, arguments);
}

function A(attrs){
  return dom('a', attrs, arguments);
}

function IMG(attrs){
  return dom('img', attrs, arguments);
}

function isArray(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
      return false;
   else
      return true;
}

function dom(name, attrs, args){
  if (typeof(attrs) == 'undefined'){
    attrs = {};
  }
  if (args.length > 1){
    attrs.childNodes = []
    for(i = 1; i < args.length; i++) {
      if(isArray(args[i])){ // flatten arrays
        attrs.childNodes = $.merge(attrs.childNodes, args[i])
      } else {
        attrs.childNodes.push(args[i]);
      }
    }
  }
  return DOM.Element.Create.createElement(name, attrs);
}

function appendChildNodes(){
  nodes = [];
  for (i = 1; i < arguments.length; i++){
    nodes.push(arguments[i]);
  }
  return DOM.Element.Create.updateElement(arguments[0], {childNodes: nodes});
}


function prettyHTML(dom, indent_string, indent_step) {
  if (typeof(indent_step) == 'undefined' || indent_step === null) {
    indent_step = 2;
  }
  
  // if we're just starting out, no indent
  if (typeof(indent_string) == 'undefined' || indent_string === null){
    indent_string = "\n";
  } else {
    for(var i = 0; i < indent_step; i++) {indent_string += ' ';}
  }
  
  var output  = '';
  
  if (typeof(dom) == 'string') {
    output += indent_string + dom;
  } else if (dom.nodeType == 1) {
    //type 1 = element
    output += indent_string + '<' + dom.nodeName.toLowerCase();
    var attributes = [];
    var domAttr = attributeArray(dom);
    for (var i = 0; i < domAttr.length; i++) {
      var a = domAttr[i];
      output += " " + a.name + '="' + a.value + '"';
    }
    if (dom.hasChildNodes()){
      output += '>';
      if(dom.childNodes.length == 1 && dom.childNodes[0].nodeType == 3) {
        output += dom.childNodes[0].nodeValue;
        output += '</' + dom.nodeName.toLowerCase() + '>';
      } else {
        var children = dom.childNodes;
        for (i = 0; i < children.length; i++) {
          output += prettyHTML(children[i], indent_string);
        }
        output += indent_string + '</' + dom.nodeName.toLowerCase() + '>';
      }

    } else {
      output += ' />';
    }
  } else if (dom.nodeType == 3) {
    output += dom.nodeValue;
  }
  if(indent_string == "\n" && output[0] == "\n"){
    output = output.substring(1, output.length);
  }
  
  return output;
}