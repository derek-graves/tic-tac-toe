const Player = (name, piece) => {
  //gameState will decide which piece the player is when creating players
  //const move = () => {};

  const getName = () => name;
  const getPiece = () => piece;

  return {getName, getPiece};
}

const gameBoard = (() => {
  let _board = new Array(9);

  const getBoard = () => _board;

  const setBoard = (player, location) => {
    _board[location] = player;
  }

  return {getBoard, setBoard};
})();

const displayController = (() => {
  const _boardElement = document.getElementById('board');
  const _boardSlots = [..._boardElement.children];

  const renderBoard = () => {
    const _currentBoard = gameBoard.getBoard();
    for (let i = 0; i <= 8; i++) {
      _boardSlots[i].textContent = _currentBoard[i]
    };
  }
  
  return {renderBoard};
})();

const gameController = (() => {
  const _p1 = Player("me", "x");
  const _p2 = Player("you", "o");

  //turn logic
  let _currentTurn = _p1.getPiece();
  const getTurn = () => _currentTurn;
  const _nextTurn = () => {
    _currentTurn = (_currentTurn === _p1.getPiece()) ? _p2.getPiece() : _p1.getPiece();
  };

  //move logic
  function _playMove() {
    //check if move valid, only run the following if valid
    gameBoard.setBoard(_currentTurn, this.id.slice(-1));
    displayController.renderBoard();
    //check for win or tie, if so: display winner, reset game
    _nextTurn();

  };

  //bind playMove to each square
  const boardSlots = [...document.getElementById('board').children]
  for (const slot of boardSlots) {
    slot.onclick = _playMove.bind(slot);
  };

  return {getTurn};
})();

const computerPlayer = (() => {
  //minmax algorithm to create unbeatable AI
})();