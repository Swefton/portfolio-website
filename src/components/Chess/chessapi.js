// testApi.js

const url = "https://api.chess.com/pub/player/sweftonxd/games/live/180/0";

async function fetchGame() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log(typeof data)
    console.log("API response:", data.games[data.games.length - 1]);
  } catch (error) {
    console.error("Error fetching API:", error);
  }
}

fetchGame();

