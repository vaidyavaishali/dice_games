export const COLORS_POTS = [
  "redPot", "bluePot", "greenPot", "yellowPot",
  "purplePot",  "orangePot","blackPot"
];

export const DICE_ICONS = [
  "fa-dice-one",
  "fa-dice-two",
  "fa-dice-three",
  "fa-dice-four",
  "fa-dice-five",
  "fa-dice-six",
];

export const INITIAL_PLAYERS = [
  { name: "Player 1", image: 1, lastDice: 0, score: 0, lastMovement: 0, hasStarted: false },
  { name: "Player 2", image: 0, lastDice: 0, score: 0, lastMovement: 0, hasStarted: false },
  { name: "Player 3", image: 3, lastDice: 0, score: 0, lastMovement: 0, hasStarted: false },
  { name: "Player 4", image: 4, lastDice: 0, score: 0, lastMovement: 0, hasStarted: false },
  { name: "Player 5", image: 5, lastDice: 0, score: 0, lastMovement: 0, hasStarted: false },
  { name: "Player 6", image: 6, lastDice: 0, score: 0, lastMovement: 0, hasStarted: false },
  { name: "Player 7", image: 7, lastDice: 0, score: 0, lastMovement: 0, hasStarted: false ,}
];

// export const LADDERS = [
//   [4, 16, 17, 25],
//   [21, 39],
//   [29, 32, 33, 48, 53, 67, 74],
//   [43, 57, 64, 76],
//   [63, 62, 79, 80],
//   [71, 89],
// ];

export const LADDERS = [
  { start: 4, end: 16 }, { start: 17, end: 25 }, { start: 21, end: 39 },
  { start: 29, end: 74 }, { start: 43, end: 76 }, { start: 71, end: 89 }
];


// export const SNAKES = [
//   [30, 12, 13, 7],
//   [47, 46, 36, 35, 27, 15],
//   [56, 44, 38, 23, 19],
//   [73, 69, 51],
//   [82, 79, 62, 59, 42],
//   [92, 88, 75],
//   [98, 97, 83, 84, 85, 77, 64, 76, 65, 55],
// ];

export const SNAKES = [
  { start: 30, end: 7 }, { start: 47, end: 15 }, { start: 56, end: 19 },
  { start: 73, end: 51 }, { start: 82, end: 42 }, { start: 92, end: 75 },
  { start: 98, end: 55 }
];
export const API_BASE_URL = "https://your-api-url.com"; // Replace with the actual URL
