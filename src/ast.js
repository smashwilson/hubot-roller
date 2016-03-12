'use strict';

function Die(count, sides) {
  this.count = count == null ? 1 : count;
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

Int.prototype.dump = function () {
  return `Int(${this.value})`
};
