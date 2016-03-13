{
  var ast = require('./ast');
  var Additive = ast.Additive;
  var Die = ast.Die;
  var Int = ast.Int;
}

expression
= additive

additive
= left:roll ws op:[+-] ws right:additive { return new Additive(left, op, right); }
/ roll

roll
= count:integer ? "d" sides:integer { return new Die(count, sides); }
/ integer

integer
= digits:[0-9]+ { return new Int(digits); }
/ "(" ws expr:expression ws ")" { return expr; }

ws
= [ \t\n\r]*
