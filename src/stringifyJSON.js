// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  var returnString = '';

  if (typeof(obj) === 'number' || typeof(obj) === 'boolean' || obj === null) {
    returnString += obj;
    return returnString;
  }
  if (typeof(obj) === 'string') {
    returnString += obj;
    return '"' + returnString + '"';
  }


  if (Array.isArray(obj)) {
    var returnString = '[';
    if (obj.length > 0) {
      for (var i = 0; i < obj.length; i++) {
        returnString += stringifyJSON(obj[i]) + ',';
      }

      returnString = returnString.substring(0, returnString.length - 1) + ']';

    } else {
      returnString += ']';
    }
    return returnString;
  }

  if (typeof obj === 'object' && !Array.isArray(obj)) {
    for (key in obj) {
      if (typeof(obj[key]) === 'function' || obj[key] === undefined) {
        delete obj.key;
        delete obj[key];

      }
    }

    returnString = '{';
    if (Object.keys(obj).length > 0) {
      for (key in obj) {

        returnString += '"' + String(key) + '"' + ':' + stringifyJSON(obj[key]) + ',';
      }

      returnString = returnString.substring(0, returnString.length - 1) + '}';
    } else {
      returnString += '}';
    }


  }

  return returnString;
};
