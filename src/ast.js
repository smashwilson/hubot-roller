'use strict';

function Additive(left, operator, right) {
  this.left = left;
  this.operator = operator;
  this.right = right;
}

exports.Additive = Additive;

Additive.prototype.evaluate = function () {
  let op = () => {
    throw new Error(`Unrecognized operator: ${this.operator}`);
  };

  if (this.operator === '+') op = (l, r) => l + r;
  if (this.operator === '-') op = (l, r) => l - r;

  return op(this.left.evaluate(), this.right.evaluate());
};

Additive.prototype.dump = function () {
  return `(${this.operator} ${this.left.dump()} ${this.right.dump()})`;
};

function Die(count, sides) {
  this.count = count == null ? one : count;
  this.sides = sides;
}

exports.Die = Die;

Die.prototype.evaluate = function () {
  let result = 0;

  let sideValue = this.sides.evaluate();
  let countValue = this.count.evaluate();

  for (var i = 0; i < countValue; i++) {
    let max = sideValue;
    let min = 1;

    result += Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return result;
};

Die.prototype.dump = function () {
  return `(d ${this.count.dump()} ${this.sides.dump()})`;
};

function Int(digits) {
  this.value = parseInt(digits.join(""), 10);
}

exports.Int = Int;

const one = new Int(['1']);

Int.prototype.evaluate = function () {
  return this.value;
};

Int.prototype.dump = function () {
  return `(i ${this.value})`
};
