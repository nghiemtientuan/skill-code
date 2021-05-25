// start US validation US phone number
/*
* validation US phone number
* true: 555-555-5555, (555)555-5555, (555) 555-5555, 555 555 5555, 5555555555, 1 555 555 5555
* false: 2 (757) 622-7382, 1 555)555-5555
* */
function telephoneCheck(str) {
  if (!balancedParens(str)) {
    return false;
  }
  var newStr = str.replace(/\s/g, '');
  var patt = /^1?\(?\d{3}-?\)?\d{3}-?\d{4}$/;

  return patt.test(newStr);
}

function balancedParens(string) {
  var stack = [];
  var pairs = {
    '[': ']',
    '{': '}',
    '(': ')'
  };
  var closers = {
    ')': 1,
    ']': 1,
    '}': 1
  };
  for (var i = 0; i < string.length; i++) {
    var cur = string[i];
    if (pairs[cur]) {
      stack.push(pairs[cur]);
    } else if (cur in closers) {
      if(stack[stack.length - 1] === cur) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return !stack.length;
}

// end US validation US phone number
