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

  const unsetBoard = (row, column) => {
    _board[row][column] = "";
  }

  const resetBoard = () => {
    _board = [["", "", ""], ["", "", ""], ["", "", ""]];
  }

  return {getBoard, setBoard, resetBoard};
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
  let _opponent = false; //false for player v. player, true for player v. computer
  let _gameInProgress = false;

  //turn logic
  let _currentTurn = null;
  const getTurn = () => _currentTurn;
  const _nextTurn = () => {
    _currentTurn = (_currentTurn === _p1.getPiece()) ? _p2.getPiece() : _p1.getPiece();
    document.getElementById("status").textContent = `${_currentTurn}'s turn! `;
  };

  //move logic
  function _playMove() {
    const chosenSlot = this.id.slice(-2);
    const chosenRow = chosenSlot.slice(0,1);
    const chosenCol = chosenSlot.slice(-1);
    const currentBoard = gameBoard.getBoard();

    //play move only if valid
    move:
    if ((currentBoard[chosenRow][chosenCol] === "") && (_gameInProgress)) {
      gameBoard.setBoard(_currentTurn, chosenRow, chosenCol);
      displayController.renderBoard();

      //check for win or tie, if so: display winner, disable play
      const winner = winConditions.checkWin(_currentTurn, chosenRow, chosenCol);
      if (winner) {
        document.getElementById("status").textContent = `${_currentTurn} wins!`;
        _gameInProgress = false;
        break move;
      }
      const numMoves = currentBoard.flat().filter(slot => slot !== "").length;
      if (numMoves === 9) {
        document.getElementById("status").textContent = "It's a tie!";
        _gameInProgress = false;
        break move;
      }
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

  //start logic
  function _start() {
    //create players and disable player input
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    _p1 = Player(player1.value, 'x');
    _p2 = Player(player2.value, 'o');
    player1.disabled = true;
    player2.disabled = true;

    //set currentTurn
    _currentTurn = _p1.getPiece();

    //set status
    document.getElementById("status").textContent = `${_currentTurn}'s turn! `;

    //pick mode and disable mode toggle
    const opponentToggle = document.getElementById("opponent");
    _opponent = opponentToggle.checked;
    opponentToggle.disabled = true;

    //disable start button and enable play
    document.getElementById("start").disabled = true;
    _gameInProgress = true;
  }
  //run _start on start button click
  const _startButton = document.getElementById("start");
  _startButton.onclick = _start;

  //reset logic
  function _reset() {
    //clear players and enable player input
    _p1 = null;
    _p2 = null;
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    player1.value = "";
    player2.value = "";
    player1.disabled = false;
    player2.disabled = false;

    //reset opponent and enable opponent choice
    _opponent = false;
    const opponentToggle = document.getElementById("opponent");
    opponentToggle.disabled = false;

    //clear board
    gameBoard.resetBoard();
    displayController.renderBoard();
    
    //reset current turn and status
    _currentTurn = null;
    document.getElementById("status").textContent = "Pre-game";


    //disable play, enable start
    _gameInProgress = false;
    document.getElementById("start").disabled = false;
  }
  //run _reset on reset button click
  const _resetButton = document.getElementById("reset");
  _resetButton.onclick = _reset;

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
  };

  const checkWin = (player, row, col) => {
    return (_horizontal(player, row) || _vertical(player, col) || _diagonal(player, row, col) || _antidiagonal(player, row, col));
  };

  return {checkWin};
})();

const computerPlayer = (() => {
  //unbeatable AI built with minimax

  //playable (empty) slots
  const _findEmptySlots = (board) => {
    let empty = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        empty.push(i)
      }
    }
    return empty;
}
})();