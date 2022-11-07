const gameBoard = (() => {
  let board = ["x","x","o","x","o","x","o","o","o"];

  const getBoard = () => board;

  const setBoard = (player, location) => {
    board[location] = player;
  }

  return {getBoard, setBoard};
})();

const displayController = (() => {
  //const renderBoard = () => {};
})();

const gameController = (() => {
  //const gameOver = false;
})();

const Player = (name, piece) => {
  //gameState will decide which piece the player is when creating players
  //const move = () => {};
}

const computerPlayer = (() => {
  //minmax algorithm to create unbeatable AI
})();