// Removes leading whitespaces
function ltrim(value) {
   var re = /\s*((\S+\s*)*)/;
   return value.replace(re, "$1");
}

// Removes ending whitespaces
function rtrim(value) {
   var re = /((\s*\S+)*)\s*/;
   return value.replace(re, "$1");
}

// Removes leading and ending whitespaces
function trim(value) {
   return ltrim(rtrim(value));
}
