{
  var ast = require('./ast');
  var Additive = ast.Additive;
  var Die = ast.Die;
  var Int = ast.Int;
}

expression
= ws add:additive ws { return add; }

additive
= left:roll ws op:[+-] ws right:additive { return new Additive(left, op, right); }
/ roll

roll
= count:integer ? "d" sides:integer { return new Die(count, sides); }
/ integer

integer
= digits:[0-9]+ { return new Int(digits); }
/ "(" expr:expression ")" { return expr; }

ws
= [ \t\n\r]*
