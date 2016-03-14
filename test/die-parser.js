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

  it('parses a die roll', parsesAs('1d20', '(d (i 1) (i 20))'));
  it('defaults die count to 1', parsesAs('d20', '(d (i 1) (i 20))'));

  it('parses addition', parsesAs('1d10 + 2d6 + 7',
    '(+ (d (i 1) (i 10)) (+ (d (i 2) (i 6)) (i 7)))'));

  it('parses subtraction', parsesAs('1 - 3 + 3d4',
    '(- (i 1) (+ (i 3) (d (i 3) (i 4))))'));

  it('parses parens', parsesAs('(1 + 2)d(10 - 5)',
    '(d (+ (i 1) (i 2)) (- (i 10) (i 5)))'));

  it('accepts trailing whitespace', parsesAs(' 2d6 ', '(d (i 2) (i 6))'));
});
