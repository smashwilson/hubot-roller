'use strict';

const expect = require('chai').expect;
const ast = require('../src/ast');
const Int = ast.Int;
const Die = ast.Die;
const Additive = ast.Additive;
const report = ast.report;

describe('the ast', () => {
  describe('evaluate', () => {
    it('evaluates integers', () => {
      let i = new Int(['12']);
      expect(i.value).to.equal(12);
    });

    it('evaluates a die roll', () => {
      let d = new Die(new Int(['1']), new Int(['6']));
      let v = d.value;
      expect(v >= 1).to.be.true;
      expect(v <= 6).to.be.true;
    });

    it('evaluates addition', () => {
      let a = new Additive(new Int(['3']), '+', new Int(['4']));
      expect(a.value).to.equal(7);
    });

    it('evaluates subtraction', () => {
      let s = new Additive(new Int(['4']), '-', new Int(['3']));
      expect(s.value).to.equal(1);
    });
  });

  describe('reporting', () => {
    it('reports integer values', () => {
      let i = new Int(['42']);
      expect(report(i)).to.equal('42 = 42');
    });

    it('reports die rolls and their results', () => {
      let d = new Die(new Int(['3']), new Int(['4']));
      expect(report(d)).to.match(/3d4 \[[1-4], [1-4], [1-4]\] = \d+/);
    });

    it('reports additive operations', () => {
      let a = new Additive(new Int(['3']), '+', new Int(['4']));
      expect(report(a)).to.equal('3 + 4 = 7');
    });

    it('reports the result at the end', () => {
      let d0 = new Die(new Int(['2']), new Int(['4']));
      let d1 = new Die(new Int(['3']), new Int(['3']));
      let a = new Additive(d0, '+', new Additive(new Int(['7']), '-', d1));

      expect(report(a)).to.match(/2d4 \[[1-4], [1-4]\] \+ 7 - 3d3 \[[1-3], [1-3], [1-3]\] = \d+/);
    });

    it('uses parenthesis', () => {
      let d0 = new Die(new Int(['2']), new Int(['4']));
      let a0 = new Additive(new Int(['1']), '+', new Int(['5']));
      let d1 = new Die(d0, a0);

      expect(report(d1)).to.match(/\(2d4 \[[1-4], [1-4]\]\)d\(1 \+ 5\) \[[1-6](, [1-6]){0,7}\] = \d+/);
    });

    it('truncates after 100 rolls', () => {
      let d = new Die(new Int(['101']), new Int(['1']));

      expect(report(d)).to.equal('\.\.\. = 101 (you jerk)');
    });
  });
});
