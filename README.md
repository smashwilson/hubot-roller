# Hubot Dice Roller

[![Build Status](https://travis-ci.org/smashwilson/hubot-roll.svg?branch=master)](https://travis-ci.org/smashwilson/hubot-roll)

*hubot roll (1d100)d(4d17 + 5)*

Roll arbitrary expressions involving polyhedral dice. Uses a real PEG parser.

```
hubot> hubot roll 1d20
Shell: d20 [16] = 16
hubot> hubot roll 3d6 + 4
Shell: 3d6 [6, 1, 5] + 4 = 16
hubot> hubot roll (3d6)d(4d4 + 7) - 4
Shell: (3d6 [4, 1, 1])d(4d4 [3, 1, 3, 2] + 7) [1, 2, 6, 11, 1, 14] - 4 = 31
```

## Installing

1. From the root directory of your Hubot, run `npm install --save hubot-roller`.
2. Add `"hubot-roller"` to your `external-scripts.json` file.
3. Profit :dollar:
