{
  var ast = require('./ast');
  var Additive = ast.Additive;
  var Die = ast.Die;
  var Int = ast.Int;
}

expression
= additive

additive
= left:roll [ \t]* op:[+-] [ \t]* right:additive { return new Additive(left, op, right); }
/ roll

roll
= count:integer ? "d" sides:integer { return new Die(count, sides); }
/ integer

integer
= digits:[0-9]+ { return new Int(digits); }
/ "(" [ \t]* expr:expression [ \t]* ")" { return expr; }
