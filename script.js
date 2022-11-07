const gameBoard = (() => {
  let board = ["x","x","o","x","o","x","o","o","o"];

  const playMove = (player, location) => {
    board[location] = player;
  }

  return {playMove};
})();

const displayController = (() => {
  //const renderBoard = () => {};
})();

const gameState = (() => {
  //const gameOver = false;
})();

const Player = (name, piece) => {
  //gameState will decide which piece the player is when creating players
  //const move = () => {};
}

const computerPlayer = (() => {
  //minmax algorithm to create unbeatable AI
})();