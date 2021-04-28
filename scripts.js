const gameBoard = (() => {
  const players = [];

  const displayXO = function () {
    let boardDiv = document.querySelector(`.board`);
    for (let i = 0; i < board.length; i++) {
      boardDiv.innerHTML += `<div class="cell${i}">${board[i]}</div>`;
    }
  };

  const hideElement = function (element) {
    element.style.opacity = 0;
  };

  const board = [`x`, `O`, `x`, `O`, `x`, `O`, `x`, `O`, `x`];

  return {
    board,
    displayXO,
    players,
    hideElement,
  };
})();

function player(name, marker) {
  return {
    name,
    marker,
  };
}

const gamePlay = (function () {
  const addPlayer = function (e) {
    e.preventDefault();
    let markerChoice = xRadioBtn.checked ? `X` : `Y`;
    gameBoard.players.push(player(nameInput.value, markerChoice));
    if (gameBoard.players.length === 1) {
        gameBoard.hideElement(markerSelector);
    if (gameBoard.players.length === 1 && markerChoice === 'X') markerChoice = 'Y';
    if (gameBoard.players.length === 1 && markerChoice === 'Y') markerChoice = 'X';
    
    if (gameBoard.players.length === 2) gameBoard.hideElement(createPlayerDiv);
  };

  const chooseXY = function () {};
  return {
    addPlayer,
  };
})();

const okButton = document.querySelector(`button.ok`);
const nameInput = document.querySelector(`input#name`);
const markerSelector = document.querySelector(`.marker-selector`);
const xRadioBtn = markerSelector.querySelector(`#x`);
const createPlayerDiv = document.querySelector(`div.create-player`);

okButton.addEventListener(`click`, gamePlay.addPlayer);

gameBoard.displayXO();
