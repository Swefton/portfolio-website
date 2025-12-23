// testApi.js
import { Chess } from 'chess.js';

const url = "https://api.chess.com/pub/player/sweftonxd/games/live/180/0";

const pieceUnicode = {
  p: 'P', r: 'R', n: 'N', b: 'B', q: 'Q', k: 'K',
  P: 'O', R: 'T', N: 'M', B: 'V', Q: 'W', K: 'L',
  '.' : '·'
};

const generateBoardGrid = (board) => {
  const grid = [];
  for (let i = 7; i >= 0; i--) { // ranks from 8 to 1
    const row = [];
    for (let j = 0; j < 8; j++) {
      const square = board[i][j];
      if (square) {
        const key = square.color === 'w' ? square.type.toUpperCase() : square.type.toLowerCase();
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
    const myLast15 = data.games
    .filter(game => game.rated === true)
    .slice(-15)
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
  
    console.log(myLast15);

    const pgn = data.games[data.games.length - 1].pgn;

    const chess = new Chess();
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

    for (let i = 0; i < 10; ++i) {
      // stepForward();
    }


  } catch (error) {
    console.error("Error fetching API:", error);
  }
}

fetchGame();

