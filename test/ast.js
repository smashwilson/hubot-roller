'use strict';

const expect = require('chai').expect;
const ast = require('../src/ast');
const Int = ast.Int;
const Die = ast.Die;
const Additive = ast.Additive;

describe('the ast', () => {
  describe('evaluate', () => {
    it('evaluates integers', () => {
      let i = new Int(['12']);
      expect(i.evaluate()).to.equal(12);
    });

    it('evaluates a die roll', () => {
      let d = new Die(new Int(['1']), new Int(['6']));
      let v = d.evaluate();
      expect(v >= 1).to.be.true;
      expect(v <= 6).to.be.true;
    });

    it('evaluates addition', () => {
      let a = new Additive(new Int(['3']), '+', new Int(['4']));
      expect(a.evaluate()).to.equal(7);
    });

    it('evaluates subtraction', () => {
      let s = new Additive(new Int(['4']), '-', new Int(['3']));
      expect(s.evaluate()).to.equal(1);
    });
  });
});
