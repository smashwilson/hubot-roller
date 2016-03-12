'use strict';

function Additive(left, operator, right) {
  this.left = left;
  this.operator = operator;
  this.right = right;
}

exports.Additive = Additive;

Additive.prototype.dump = function () {
  let op = 'Unk';
  if (this.operator === '+') op = 'Add';
  if (this.operator === '-') op = 'Sub';

  return `${op}(${this.left.dump()}, ${this.right.dump()})`;
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
