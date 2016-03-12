'use strict';

function Additive(operator, operands) {
  this.operator = operator;
  this.operands = operands;
}

Additive.prototype.opWith = function (op, right) {
  return other.opWithAdditive(this);
};

Additive.prototype.opWithAdditive = function (left) {
  //
};

Additive.prototype.dump = function () {
  let subdump = this.operands.map((o) => o.dump()).join(", ");
  let op = 'Unk';
  if (this.operator === '+') op = 'Add';
  if (this.operator === '-') op = 'Sub';

  return `${op}(${subdump})`;
};

function Die(count, sides) {
  this.count = count == null ? one : count;
  this.sides = sides;
}

exports.Die = Die;

Die.prototype.dump = function () {
  return `Die(${this.count.dump()}, ${this.sides.dump()})`;
};

function Int(digits) {
  this.value = parseInt(digits.join(""), 10);
}

exports.Int = Int;

const one = new Int(['1']);

Int.prototype.dump = function () {
  return `Int(${this.value})`
};
