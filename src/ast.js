'use strict';

function Additive(left, operator, right) {
  this.left = left;
  this.operator = operator;
  this.right = right;
}

exports.Additive = Additive;

Additive.prototype.dump = function () {
  return `(${this.operator} ${this.left.dump()} ${this.right.dump()})`;
};

function Die(count, sides) {
  this.count = count == null ? one : count;
  this.sides = sides;
}

exports.Die = Die;

Die.prototype.dump = function () {
  return `(d ${this.count.dump()} ${this.sides.dump()})`;
};

function Int(digits) {
  this.value = parseInt(digits.join(""), 10);
}

exports.Int = Int;

const one = new Int(['1']);

Int.prototype.dump = function () {
  return `(i ${this.value})`
};
