// testApi.js
import { Chess } from 'chess.js';

const url = "https://api.chess.com/pub/player/sweftonxd/games/live/180/0";

async function fetchGame() {
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
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

    console.log(chess.getHeaders());

    for (let i = 0; i < 10; ++i) {
      stepForward();
    }

  } catch (error) {
    console.error("Error fetching API:", error);
  }
}

fetchGame();

