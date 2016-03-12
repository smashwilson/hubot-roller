'use strict';

function Die(count, sides) {
  this.count = count == null ? 1 : count;
  this.sides = sides;
}

exports.Die = Die;
