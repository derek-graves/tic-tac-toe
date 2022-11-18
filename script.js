const Player = (name, piece) => {

  const getName = () => name;
  const getPiece = () => piece;

  return {getName, getPiece};
}

const gameBoard = (() => {
  let _board = [["", "", ""], ["", "", ""], ["", "", ""]];

  const getBoard = () => _board;

  const setBoard = (player, row, column) => {
    _board[row][column] = player;
  }

  return {getBoard, setBoard};
})();

const displayController = (() => {
  const _boardElement = document.getElementById('board');
  const _boardSlots = [..._boardElement.children];

  const renderBoard = () => {
    const _currentBoard = gameBoard.getBoard().flat();
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
    const chosenSlot = this.id.slice(-2);
    const chosenRow = chosenSlot.slice(0,1);
    const chosenCol = chosenSlot.slice(-1);
    const currentBoard = gameBoard.getBoard();

    //play move only if valid
    if (currentBoard[chosenRow][chosenCol] === "") {
      gameBoard.setBoard(_currentTurn, chosenRow, chosenCol);
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
  
  const _horizontal = (player, row) => {
    for (let i = 0; i <= 2; i++) {
      if (currentBoard[row][i] !== player) {
        return false;
      }
      if (i == 2) {
        return true;
      }
    }
  };

  const _vertical = (player, col) => {
    for (let i = 0; i <= 2; i++) {
      if (currentBoard[i][col] !== player) {
        return false;
      }
      if (i == 2) {
        return true;
      }
    }
  };

  const _diagonal = (player, row, col) => {
    if (row === col) {
      for (let i = 0; i <= 2; i++) {
        if (currentBoard[i][i] !== player) {
          return false;
        }
        if (i == 2) {
          return true;
        }
      }
    }
    return false;
  };

  const _antidiagonal = (player, row, col) => {
    if (parseInt(row) + parseInt(col) === 2) {
      if (row === col) {
        for (let i = 0; i <= 2; i++) {
          if (currentBoard[i][2 - i] !== player) {
            return false;
          }
          if (i == 2) {
            return true;
          }
        }
      }
      return false;
    }
  };

  const checkWin = (player, row, col) => {
    return (_horizontal(player, row) || _vertical(player, col) || _diagonal(player, row, col) || _antidiagonal(player, row, col));
  };

  return {checkWin};
})();

const computerPlayer = (() => {
  //minmax algorithm to create unbeatable AI
})();