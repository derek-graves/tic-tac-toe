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

  return {getBoard, setBoard, unsetBoard, resetBoard};
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
  let _isComputerOpponent = false; //false for player v. player, true for player v. computer
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
    const currentBoard = gameBoard.getBoard();
    const chosenSlot = this.id.slice(-2);
    const chosenRow = chosenSlot.slice(0,1);
    const chosenCol = chosenSlot.slice(-1);

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

      //play computer move, if necessary
      if (_isComputerOpponent && _currentTurn === "o" && _gameInProgress) {
        computerPlayer.playOptimalMove();
        _nextTurn();
      }

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
    _isComputerOpponent = opponentToggle.checked;
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
    _isComputerOpponent = false;
    const opponentToggle = document.getElementById("opponent");
    opponentToggle.disabled = false;
    opponentToggle.checked = false;

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

  function _opponentChange() {
    const opponentToggle = document.getElementById("opponent");
    const player2 = document.getElementById("player2");
    if (opponentToggle.checked) {
      player2.value = "Computer";
      player2.disabled = true;
    } else {
      player2.value = "";
      player2.disabled = false;
    }
  }

  //run _reset on reset button click
  const _opponentToggleButton = document.getElementById("opponent");
  _opponentToggleButton.onclick = _opponentChange;

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

  const checkAnyWin = (player) => {
    for (let i = 0; i < currentBoard.length; i++) {
      for (let j = 0; j < currentBoard.length; j++) {
        if (checkWin(player, i, j)) {
          return true;
        }
      }
    }
    return false;
  };

  return {checkWin, checkAnyWin};
})();

const computerPlayer = (() => {
  //unbeatable AI built with minimax

  const _findEmptySlots = (board) => {
    let empty = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === "") {
          const slot = {row: i, column: j}
          empty.push(slot);
        }
      }
    }
    return empty;
  }

  //the minimax function
  const _minimax = (board, player) => {
    let availableSlots = _findEmptySlots(board);
  
    //check for a win or tie
    if (winConditions.checkAnyWin("x")) {
      return {score: -1}; //player always x
    } else if (winConditions.checkAnyWin("o")) {
      return {score: 1}; //AI always o
    } else if (availableSlots.length === 0) {
      return {score: 0};
    }
  
    let potentialMoves = [];
    for (const slot of availableSlots) {
      let move = {};
      move.address = slot;
  
      //temporarily play move to allow for evaluation
      gameBoard.setBoard(player, slot.row, slot.column);
  
      //evaluate minimax for the requisite player
      //AI is always o; player is always x
      if (player === "o") {
        let result = _minimax(board, "x");
        move.score = result.score;
      } else {
        let result = _minimax(board, "o");
        move.score = result.score;
      }
  
      //undo temporary move
      gameBoard.unsetBoard(slot.row, slot.column);
  
      potentialMoves.push(move);
    }
  
    //maximize on AI move; minimize on player move
    let optimalMove;
    if (player === "o") {
      let optimalScore = -2;
      for (const move of potentialMoves) {
        if (move.score > optimalScore) {
          optimalScore = move.score;
          optimalMove = move;
        }
      }
    } else {
      let optimalScore = 2;
      for (const move of potentialMoves) {
        if (move.score < optimalScore) {
          optimalScore = move.score;
          optimalMove = move;
        }
      }
    }
  
    return optimalMove;
  }

  const playOptimalMove = () => {
    const currentBoard = gameBoard.getBoard();
    const currentTurn = gameController.getTurn();
    const optimalMove = _minimax(currentBoard, currentTurn);
    gameBoard.setBoard(currentTurn, optimalMove.address.row, optimalMove.address.column);
    displayController.renderBoard();

    //check for win or tie, if so: display winner, disable play
    const winner = winConditions.checkWin(currentTurn, optimalMove.address.row, optimalMove.address.column);
    if (winner) {
      document.getElementById("status").textContent = `${currentTurn} wins!`;
      _gameInProgress = false;
      return;
    }
    const numMoves = currentBoard.flat().filter(slot => slot !== "").length;
    if (numMoves === 9) {
      document.getElementById("status").textContent = "It's a tie!";
      _gameInProgress = false;
      return;
    }
  }

  return {playOptimalMove};
})();