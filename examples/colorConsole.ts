const ESCAPE = '\x1b';

const RESET = `${ESCAPE}[0m`;

const STRING_END = '\u001b[39m\u001b[49m';

export const fgColor = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  white_default: 39,
};
export const bgColor = {
  black: 40, // ['set background color to black', '--']],
  red: 41, // ['set background color to red', '--']],
  green: 42, // ['set background color to green', '--']],
  yellow: 43, // ['set background color to yellow', '--']],
  blue: 44, // ['set background color to blue', '--']],
  magenta: 45, // ['set background color to magenta (purple)', '--']],
  cyan: 46, // ['set background color to cyan', '--']],
  white: 47, // ['set background color to white', '--']],
  white_default: 49, // ['set background color to default (black)', '--']],
};


export function log
(fgNum = fgColor.black,
 bgNum = bgColor.white,
 ...args: any[]
) {
  console.log(`${ESCAPE}[${fgNum}m\u001b[${bgNum}m`, ...args, STRING_END);
};


/*
export const log = {
  red: (...arg: any) => {
    console.log(`${FG_BLACK}${BG_RED}%s${RESET}`, arg);
  },
  yellow: (...arg: any) => {
    console.log(`${FG_YELLOW}%s${RESET}`, arg);
  },
  green: (...arg: any) => {
    console.log(`${FG_GREEN}%s${RESET}`, arg);
  }
};


*/