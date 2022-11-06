const gameBoard = (() => {
  let board = ["x","x","o","x","o","x","o","o","o"];

  const playMove = (player, location) => {
    board[location] = player;
  }

  return {playMove};
})();

