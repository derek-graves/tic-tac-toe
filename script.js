const Player = (name, piece) => {
  //gameState will decide which piece the player is when creating players
  //const move = () => {};

  const getName = () => name;
  const getPiece = () => piece;

  return {getName, getPiece};
}

const gameBoard = (() => {
  let _board = ["", "", "", "", "", "", "", "", ""];

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
    const chosenSlot = this.id.slice(-1);
    const currentBoard = gameBoard.getBoard();

    //play move only if valid
    if (currentBoard[chosenSlot] === "") {
      gameBoard.setBoard(_currentTurn, chosenSlot);
      displayController.renderBoard();
      //check for win or tie, if so: display winner, reset game
      _nextTurn();
    } else {
      console.log("Move invalid"); //replace later with message displayed on page
    }
  };

  //bind playMove to each square
  const _boardSlots = [...document.getElementById('board').children]
  for (const slot of _boardSlots) {
    slot.onclick = _playMove.bind(slot);
  };

  return {getTurn};
})();

const winConditions = (() => {
  const currentBoard = gameBoard.getBoard();
  
  const _horizontal = () => {
  };

  const _vertical = () => {
  };

  const _diagonal = () => {
  };

  const checkWin = () => {
    return (_horizontal() || _vertical || _diagonal);
  };

  return {checkWin};
})();

const computerPlayer = (() => {
  //minmax algorithm to create unbeatable AI
})();