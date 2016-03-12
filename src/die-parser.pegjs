{
  var ast = require('./ast');
  var Die = ast.Die;
}

expression
= roll

roll
= count:integer ? "d" sides:integer { return new Die(count, sides); }

integer
= digits:[0-9]+ { return parseInt(digits.join(""), 10); }
