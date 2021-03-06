export const PACMAN = {
  FPS: 30,
  WALL: 0,
  BISCUIT: 1,
  EMPTY: 2,
  BLOCK: 3,
  PILL: 4,
  MAP: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  WALLS: [
    [
      { move: [0, 9.5] },
      { line: [3, 9.5] },
      { curve: [3.5, 9.5, 3.5, 9] },
      { line: [3.5, 8] },
      { curve: [3.5, 7.5, 3, 7.5] },
      { line: [1, 7.5] },
      { curve: [0.5, 7.5, 0.5, 7] },
      { line: [0.5, 1] },
      { curve: [0.5, 0.5, 1, 0.5] },
      { line: [9, 0.5] },
      { curve: [9.5, 0.5, 9.5, 1] },
      { line: [9.5, 3.5] },
    ],

    [
      { move: [9.5, 1] },
      { curve: [9.5, 0.5, 10, 0.5] },
      { line: [18, 0.5] },
      { curve: [18.5, 0.5, 18.5, 1] },
      { line: [18.5, 7] },
      { curve: [18.5, 7.5, 18, 7.5] },
      { line: [16, 7.5] },
      { curve: [15.5, 7.5, 15.5, 8] },
      { line: [15.5, 9] },
      { curve: [15.5, 9.5, 16, 9.5] },
      { line: [19, 9.5] },
    ],

    [{ move: [2.5, 5.5] }, { line: [3.5, 5.5] }],

    [
      { move: [3, 2.5] },
      { curve: [3.5, 2.5, 3.5, 3] },
      { curve: [3.5, 3.5, 3, 3.5] },
      { curve: [2.5, 3.5, 2.5, 3] },
      { curve: [2.5, 2.5, 3, 2.5] },
    ],

    [{ move: [15.5, 5.5] }, { line: [16.5, 5.5] }],

    [
      { move: [16, 2.5] },
      { curve: [16.5, 2.5, 16.5, 3] },
      { curve: [16.5, 3.5, 16, 3.5] },
      { curve: [15.5, 3.5, 15.5, 3] },
      { curve: [15.5, 2.5, 16, 2.5] },
    ],

    [
      { move: [6, 2.5] },
      { line: [7, 2.5] },
      { curve: [7.5, 2.5, 7.5, 3] },
      { curve: [7.5, 3.5, 7, 3.5] },
      { line: [6, 3.5] },
      { curve: [5.5, 3.5, 5.5, 3] },
      { curve: [5.5, 2.5, 6, 2.5] },
    ],

    [
      { move: [12, 2.5] },
      { line: [13, 2.5] },
      { curve: [13.5, 2.5, 13.5, 3] },
      { curve: [13.5, 3.5, 13, 3.5] },
      { line: [12, 3.5] },
      { curve: [11.5, 3.5, 11.5, 3] },
      { curve: [11.5, 2.5, 12, 2.5] },
    ],

    [
      { move: [7.5, 5.5] },
      { line: [9, 5.5] },
      { curve: [9.5, 5.5, 9.5, 6] },
      { line: [9.5, 7.5] },
    ],
    [
      { move: [9.5, 6] },
      { curve: [9.5, 5.5, 10.5, 5.5] },
      { line: [11.5, 5.5] },
    ],

    [
      { move: [5.5, 5.5] },
      { line: [5.5, 7] },
      { curve: [5.5, 7.5, 6, 7.5] },
      { line: [7.5, 7.5] },
    ],
    [{ move: [6, 7.5] }, { curve: [5.5, 7.5, 5.5, 8] }, { line: [5.5, 9.5] }],

    [
      { move: [13.5, 5.5] },
      { line: [13.5, 7] },
      { curve: [13.5, 7.5, 13, 7.5] },
      { line: [11.5, 7.5] },
    ],
    [
      { move: [13, 7.5] },
      { curve: [13.5, 7.5, 13.5, 8] },
      { line: [13.5, 9.5] },
    ],

    [
      { move: [0, 11.5] },
      { line: [3, 11.5] },
      { curve: [3.5, 11.5, 3.5, 12] },
      { line: [3.5, 13] },
      { curve: [3.5, 13.5, 3, 13.5] },
      { line: [1, 13.5] },
      { curve: [0.5, 13.5, 0.5, 14] },
      { line: [0.5, 17] },
      { curve: [0.5, 17.5, 1, 17.5] },
      { line: [1.5, 17.5] },
    ],
    [
      { move: [1, 17.5] },
      { curve: [0.5, 17.5, 0.5, 18] },
      { line: [0.5, 21] },
      { curve: [0.5, 21.5, 1, 21.5] },
      { line: [18, 21.5] },
      { curve: [18.5, 21.5, 18.5, 21] },
      { line: [18.5, 18] },
      { curve: [18.5, 17.5, 18, 17.5] },
      { line: [17.5, 17.5] },
    ],
    [
      { move: [18, 17.5] },
      { curve: [18.5, 17.5, 18.5, 17] },
      { line: [18.5, 14] },
      { curve: [18.5, 13.5, 18, 13.5] },
      { line: [16, 13.5] },
      { curve: [15.5, 13.5, 15.5, 13] },
      { line: [15.5, 12] },
      { curve: [15.5, 11.5, 16, 11.5] },
      { line: [19, 11.5] },
    ],

    [{ move: [5.5, 11.5] }, { line: [5.5, 13.5] }],
    [{ move: [13.5, 11.5] }, { line: [13.5, 13.5] }],

    [
      { move: [2.5, 15.5] },
      { line: [3, 15.5] },
      { curve: [3.5, 15.5, 3.5, 16] },
      { line: [3.5, 17.5] },
    ],
    [
      { move: [16.5, 15.5] },
      { line: [16, 15.5] },
      { curve: [15.5, 15.5, 15.5, 16] },
      { line: [15.5, 17.5] },
    ],

    [{ move: [5.5, 15.5] }, { line: [7.5, 15.5] }],
    [{ move: [11.5, 15.5] }, { line: [13.5, 15.5] }],

    [
      { move: [2.5, 19.5] },
      { line: [5, 19.5] },
      { curve: [5.5, 19.5, 5.5, 19] },
      { line: [5.5, 17.5] },
    ],
    [
      { move: [5.5, 19] },
      { curve: [5.5, 19.5, 6, 19.5] },
      { line: [7.5, 19.5] },
    ],

    [
      { move: [11.5, 19.5] },
      { line: [13, 19.5] },
      { curve: [13.5, 19.5, 13.5, 19] },
      { line: [13.5, 17.5] },
    ],
    [
      { move: [13.5, 19] },
      { curve: [13.5, 19.5, 14, 19.5] },
      { line: [16.5, 19.5] },
    ],

    [
      { move: [7.5, 13.5] },
      { line: [9, 13.5] },
      { curve: [9.5, 13.5, 9.5, 14] },
      { line: [9.5, 15.5] },
    ],
    [
      { move: [9.5, 14] },
      { curve: [9.5, 13.5, 10, 13.5] },
      { line: [11.5, 13.5] },
    ],

    [
      { move: [7.5, 17.5] },
      { line: [9, 17.5] },
      { curve: [9.5, 17.5, 9.5, 18] },
      { line: [9.5, 19.5] },
    ],
    [
      { move: [9.5, 18] },
      { curve: [9.5, 17.5, 10, 17.5] },
      { line: [11.5, 17.5] },
    ],

    [
      { move: [8.5, 9.5] },
      { line: [8, 9.5] },
      { curve: [7.5, 9.5, 7.5, 10] },
      { line: [7.5, 11] },
      { curve: [7.5, 11.5, 8, 11.5] },
      { line: [11, 11.5] },
      { curve: [11.5, 11.5, 11.5, 11] },
      { line: [11.5, 10] },
      { curve: [11.5, 9.5, 11, 9.5] },
      { line: [10.5, 9.5] },
    ],
  ],
};

export const NONE = 4;
export const UP = 3;
export const LEFT = 2;
export const DOWN = 1;
export const RIGHT = 11;
export const WAITING = 5;
export const PAUSE = 6;
export const PLAYING = 7;
export const COUNTDOWN = 8;
export const EATEN_PAUSE = 9;
export const DYING = 10;

/* Human readable keyCode index */
export const KEY = {
  BACKSPACE: 8,
  TAB: 9,
  NUM_PAD_CLEAR: 12,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  PAUSE: 19,
  CAPS_LOCK: 20,
  ESCAPE: 27,
  SPACEBAR: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  PRINT_SCREEN: 44,
  INSERT: 45,
  DELETE: 46,
  SEMICOLON: 59,
  WINDOWS_LEFT: 91,
  WINDOWS_RIGHT: 92,
  SELECT: 93,
  NUM_PAD_ASTERISK: 106,
  NUM_PAD_PLUS_SIGN: 107,
  'NUM_PAD_HYPHEN-MINUS': 109,
  NUM_PAD_FULL_STOP: 110,
  NUM_PAD_SOLIDUS: 111,
  NUM_LOCK: 144,
  SCROLL_LOCK: 145,
  // SEMICOLON: 186,
  EQUALS_SIGN: 187,
  COMMA: 188,
  'HYPHEN-MINUS': 189,
  FULL_STOP: 190,
  SOLIDUS: 191,
  GRAVE_ACCENT: 192,
  LEFT_SQUARE_BRACKET: 219,
  REVERSE_SOLIDUS: 220,
  RIGHT_SQUARE_BRACKET: 221,
  APOSTROPHE: 222,
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
};
