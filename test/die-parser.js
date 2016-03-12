'use strict';

const expect = require('chai').expect;
const parser = require('../src/die-parser');

describe('die parser', () => {
  const parsesAs = function (input, expected) {
    return () => {
      var ast = parser.parse(input);
      expect(ast.dump()).to.equal(expected);
    };
  };

  it('parses a die roll', parsesAs('1d20', 'Die(Int(1), Int(20))'));
});
