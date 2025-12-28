// testApi.js
import { Chess } from 'chess.js';
import fs from "fs";

const url = "https://api.chess.com/pub/player/sweftonxd/games/live/180/0";

const pieceUnicode = {
  p: 'P', r: 'R', n: 'N', b: 'B', q: 'Q', k: 'K',
  P: 'O', R: 'T', N: 'M', B: 'V', Q: 'W', K: 'L',
  '.' : '·'
};

const generateBoardGrid = (board, whiteView = true) => {
  const grid = [];

  const rankRange = whiteView
    ? [...Array(8).keys()].reverse()
    : [...Array(8).keys()];

  const fileRange = whiteView
    ? [...Array(8).keys()]
    : [...Array(8).keys()].reverse();

  for (const i of rankRange) {
    const row = [];
    for (const j of fileRange) {
      const square = board[i][j];
      if (square) {
        const key = square.color === 'w'
          ? square.type.toUpperCase()
          : square.type.toLowerCase();
        row.push(pieceUnicode[key]);
      } else {
        row.push(pieceUnicode['.']);
      }
    }
    grid.push({ rank: i + 1, squares: row });
  }
  return grid;
};

async function fetchGame() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const myUsername = "sweftonxd"
    const currentDate = (Date.now() / 1000) - (365 * 24 * 60 * 60);
    // console.log(currentDate);
    const myLast15 = data.games
    .filter(game => game.rated === true)
    .filter(game => game.end_time >= currentDate)
    .map(game => {
        if (game.white.username.toLowerCase() === myUsername) {
          return {
            rating: game.white.rating,
            end_time: game.end_time
          };
        }
        if (game.black.username.toLowerCase() === myUsername) {
          return {
            rating: game.black.rating,
            end_time: game.end_time
          };
        }
        return null;
      })
    .filter(Boolean);
  
    // fs.writeFileSync("temp.json", JSON.stringify(myLast15, null, 2));

    const pgn = data.games[data.games.length - 1].pgn;

    const chess = new Chess();
    console.log(chess.ascii());
    console.log(chess.board());
    chess.loadPgn(pgn);

    const moves = chess.history();
    let moveIndex = 0;

    let playboard = new Chess();

    function stepForward() {
      if (moveIndex >= moves.length) return;

      playboard.move(moves[moveIndex]);
      moveIndex++;

      console.log(playboard.ascii());
    }

    // console.log(chess.getHeaders());

    for (let i = 0; i < 1; ++i) {
      stepForward();
    }


  } catch (error) {
    console.error("Error fetching API:", error);
  }
}

fetchGame();

