const Player = (name, piece) => {
  //gameState will decide which piece the player is when creating players
  //const move = () => {};

  const getName = () => name;
  const getPiece = () => piece;

  return {getName, getPiece};
}

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
  p1 = Player("me", "x");
  p2 = Player("you", "o");

  let currentTurn = p1.getPiece();

  const getTurn = () => currentTurn;

  const nextTurn = () => {
    currentTurn = (currentTurn === p1.getPiece()) ? p2.getPiece() : p1.getPiece();
  }

  return {getTurn, nextTurn};
})();

const computerPlayer = (() => {
  //minmax algorithm to create unbeatable AI
})();