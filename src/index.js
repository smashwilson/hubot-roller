'use strict';

const dieParser = require('./die-parser');
const report = require('./ast').report;

module.exports = (robot) => {
  // Help
  robot.commands.push('hubot roll <expression> - Roll some dice and report the total. Examples: d20, 4d6 + 3, (1d6)d(2d4).');

  robot.respond(/roll(q)?\s*([^]+)/i, (msg) => {
    let quiet = msg.match[1];

    try {
      let die = dieParser.parse(msg.match[2]);
      if (quiet === 'q') {
        msg.send(die.value.toString());
      } else {
        msg.reply(report(die));
      }
    } catch (e) {
      msg.reply(`:bomb: ${e.message}`);
    }
  });
};
