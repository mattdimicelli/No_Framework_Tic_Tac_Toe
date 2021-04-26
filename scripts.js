const gameBoard = (() => {
  const players = [];
  const displayXO = function () {
    let boardDiv = document.querySelector(`.board`);
    for (let i = 0; i < board.length; i++) {
      boardDiv.innerHTML += `<div class="cell${i}">${board[i]}</div>`;
    }
  };

  const board = [`x`, `O`, `x`, `O`, `x`, `O`, `x`, `O`, `x`];
  return {
    board,
    displayXO,
    players,
  };
})();

function player(name, marker) {
  return {
    name,
    marker,
  };
}

// const gamePlay = (function () {
//   const chooseXY = function () {};
//   return {
//     exampleAction,
//   };
// })();

const okButton = document.querySelector(`button.ok`);
const nameInput = document.querySelector(`input#name`);
const markerSelector = document.querySelector(`.marker-selector`);
const xRadioBtn = markerSelector.querySelector(`#x`);

okButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  if (gameBoard.players.length === 0) markerSelector.style.opacity = 0;
  const markerChoice = xRadioBtn.checked ? `X` : `Y`;
  gameBoard.players.push(player(nameInput.value, markerChoice));
});
gameBoard.displayXO();
