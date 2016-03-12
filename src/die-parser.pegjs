{
  var ast = require('./ast');
  var Die = ast.Die;
  var Int = ast.Int;
}

expression
= roll

additive
= left:roll "+" right:additive
/ left:roll "-" right:additive
/ roll

roll
= count:integer ? "d" sides:integer { return new Die(count, sides); }

integer
= digits:[0-9]+ { return new Int(digits); }
