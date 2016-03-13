'use strict';

const dieParser = require('./die-parser');
const report = require('./ast').report;

module.exports = (robot) => {
  robot.respond(/roll\s*([^]+)/i, (msg) => {
    let die = dieParser.parse(msg.match[1]);
    msg.reply(report(die));
  });
};
