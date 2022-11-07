const gameBoard = (() => {
  let board = ["x","x","o","x","o","x","o","o","o"];

  const getBoard = () => board;

  const setBoard = (player, location) => {
    board[location] = player;
  }

  return {getBoard, setBoard};
})();

const displayController = (() => {
  const boardElement = document.getElementById('board');
  const boardSlots = [...boardElement.children];

  const renderBoard = () => {
    currentBoard = gameBoard.getBoard();
    for (let i = 0; i <= 8; i++) {
      boardSlots[i].textContent = currentBoard[i]
    };
  }
  
  return {renderBoard};
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