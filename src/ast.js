'use strict';

function Additive(left, operator, right) {
  this.left = left;
  this.operator = operator;
  this.right = right;

  let op = () => {
    throw new Error(`Unrecognized operator: ${this.operator}`);
  };

  if (this.operator === '+') op = (l, r) => l + r;
  if (this.operator === '-') op = (l, r) => l - r;

  this.value = op(this.left.value, this.right.value);

  this.dieCount = this.left.dieCount + this.right.dieCount;
}

exports.Additive = Additive;

Additive.prototype.report = function () {
  return `${this.left.report()} ${this.operator} ${this.right.report()}`;
};

Additive.prototype.dump = function () {
  return `(${this.operator} ${this.left.dump()} ${this.right.dump()})`;
};

function Die(count, sides, hilow, keep) {
  this.count = count == null ? one : count;
  this.sides = sides;
  this.hilow = hilow;
  this.keep = keep == null ? count : keep;

  this.rolls = [];

  for (var i = 0; i < this.count.value; i++) {
    let max = this.sides.value;
    let min = 1;

    let roll = Math.floor(Math.random() * (max - min + 1)) + min;
    this.rolls.push(roll);
  }

  this.value = getValue(this.rolls, hilow, keep);

  this.dieCount = (this.count.dieCount + this.sides.dieCount) + this.count.value;
}

function getValue (rolls, hilow, keep) {
  let value = 0;
  if (hilow == null) {
    value = rolls.reduce((a, b) => a + b);
  } else if (hilow == 'l') {
    let sorted = rolls.sort(function(a, b) {return b-a});
    for (var i = 0; i < Math.min(keep, rolls.length); i++) {
      value += rolls[i];
    }
  } else {
    let sorted = rolls.sort();
    for (var i = 0; i < Math.min(keep, rolls.length); i++) {
      value += rolls[i];
    }
  }
  return value;
}

exports.Die = Die;

Die.prototype.report = function () {
  let rs = this.rolls.map((r) => r.toString()).join(", ");

  let result = '';
  if (!this.count.isAtom) {
    result += `(${this.count.report()})`;
  } else if (this.count.value !== 1) {
    result += this.count.report();
  }
  result += 'd';
  if (!this.sides.isAtom) {
    result += `(${this.sides.report()})`;
  } else {
    result += this.sides.report();
  }
  result += ` [${rs}]`;

  return result;
};

Die.prototype.dump = function () {
  if(this.hilow == null) {
    return `(d ${this.count.dump()} ${this.sides.dump()})`;
  } else {
    return `(d ${this.count.dump()} ${this.sides.dump()} ${this.hilow} ${this.keep.dump()})`
  }

};

function Int(digits) {
  this.value = parseInt(digits.join(""), 10);
  this.dieCount = 0;
  this.isAtom = true;
}

exports.Int = Int;

const one = new Int(['1']);

Int.prototype.report = function () {
  return this.value.toString();
};

Int.prototype.dump = function () {
  return `(i ${this.value})`
};

const THRESHOLD = 100;

let report = function (astNode) {
  if (astNode.dieCount > THRESHOLD) {
    return `... = ${astNode.value} (you jerk)`;
  }

  return `${astNode.report()} = ${astNode.value}`;
};

exports.report = report;
