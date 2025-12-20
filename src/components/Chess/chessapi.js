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
  for (let i = 7; i >= 0; i--) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j] ? board[i][j].type : '.';
      row.push(pieceUnicode[piece]);
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
    const pgn = data.games[data.games.length - 1].pgn;

    const chess = Chess();
    chess.loadPgn(pgn);

    console.log(generateBoardGrid(chess.board()));

    const moves = chess.history();
    let moveIndex = 0;

    let playboard = Chess();

    function stepForward() {
      if (moveIndex >= moves.length) return;

      playboard.move(moves[moveIndex]);
      moveIndex++;

      console.log(playboard.ascii());
    }

    console.log(chess.getHeaders());

    for (let i = 0; i < 10; ++i) {
      // stepForward();
    }

  } catch (error) {
    console.error("Error fetching API:", error);
  }
}

fetchGame();

