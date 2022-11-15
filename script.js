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
  p1 = Player("me", "x");
  p2 = Player("you", "o");

  //turn logic
  let currentTurn = p1.getPiece();
  const getTurn = () => currentTurn;
  const nextTurn = () => {
    currentTurn = (currentTurn === p1.getPiece()) ? p2.getPiece() : p1.getPiece();
  };

  //move logic
  function playMove() {
    //may need to translate location, may not
    //check if move valid, only run the following if valid
    gameBoard.setBoard(currentTurn, this.id.slice(-1));
    displayController.renderBoard();
    //check for win or tie, if so: display winner, reset game
    nextTurn();

  };

  //bind playMove to each square
  const boardSlots = [...document.getElementById('board').children]
  for (const slot of boardSlots) {
    slot.onclick = playMove.bind(slot);
  };

  return {getTurn};
})();

const computerPlayer = (() => {
  //minmax algorithm to create unbeatable AI
})();