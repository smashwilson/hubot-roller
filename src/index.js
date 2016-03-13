'use strict';

const dieParser = require('./die-parser');
const report = require('./ast').report;

module.exports = (robot) => {
  // Help
  robot.commands.push('hubot roll <expression> - Roll some dice and report the total. Examples: d20, 4d6 + 3, (1d6)d(2d4).');

  robot.respond(/roll\s*([^]+)/i, (msg) => {
    try {
      let die = dieParser.parse(msg.match[1]);
      msg.reply(report(die));
    } catch (e) {
      msg.reply(`:bomb: ${e.message}`);
    }
  });
};
