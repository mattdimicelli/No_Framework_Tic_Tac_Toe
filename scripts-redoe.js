const playerSetup = (() => {
  const nameInputs = document.querySelectorAll(".name-form input");
  const startGameBtn = document.querySelector("button.start-game-btn");

  const players = [];

  const createPlayers = () => {
    Array.from(nameInputs).forEach((nameInput) => {
      players.push(makePlayer(nameInput));
    });
  };

  startGameBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createPlayers();
    displayController.displayNames(players);
    displayController.displayBoard();
    displayController.closePreGameSetup();
  });

  return { players };
})();

const gamePlay = (() => {
  let p1Turn = true;
  let marker;
  let boardActive = true;

  const boardDiv = document.querySelector("div.board");
  const playAgainBtn = document.querySelector("button.play-again");

  boardDiv.addEventListener("click", (e) => {
    if (boardActive) play(e);
  });

  playAgainBtn.addEventListener("click", () => {
    console.log("fire");
    boardActive = true;
    p1Turn = true;
    gameBoard.clearBoard();
  });

  const updateMarker = () => {
    marker = p1Turn ? "X" : "O";
  };

  const play = (e) => {
    const index = e.target.classList[1];
    if (gameBoard.board[index] === "") {
      updateMarker();
      gameBoard.board[index] = marker;
      p1Turn = !p1Turn;
      displayController.displayBoard();
      checkForWinOrTie();
    }
  };

  const getIsItP1sTurn = () => p1Turn;

  const possibleWins = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  const checkForWinOrTie = () => {
    const xIndices = gameBoard.createArrOfIndices("X");
    const OIndices = gameBoard.createArrOfIndices("O");

    possibleWins.forEach((combination) => {
      if (combination.every((index) => xIndices.includes(index))) {
        win("X", combination);
        return;
      }
      if (combination.every((index) => OIndices.includes(index))) {
        win("O", combination);
        return;
      }
    });

    if (gameBoard.board.every((cell) => cell !== "")) tie();
  };

  const tie = () => {
    boardActive = false;
    displayController.updateMessage("Tie game!");
  };

  const win = (marker, combination) => {
    const nameOfWinner =
      marker === "X"
        ? playerSetup.players[0].name
        : playerSetup.players[1].name;
    if (marker === "X") playerSetup.players[0].score += 1;
    if (marker === "O") playerSetup.players[1].score += 1;
    boardActive = false;
    displayController.displayScores();
    displayController.updateMessage(`${nameOfWinner} wins this round!`);
    displayController.strikeThru(combination);
  };

  return { getIsItP1sTurn };
})();

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const createArrOfIndices = (marker) => {
    let indexLocations = [];
    for (let i = 0; i < board.length; i++) {
      if (gameBoard.board[i] === marker) indexLocations.push(i);
    }
    return indexLocations;
  };

  const clearBoard = () => {
    gameBoard.board = ["", "", "", "", "", "", "", "", ""];
    displayController.displayBoard();
  };

  return { board, createArrOfIndices, clearBoard };
})();

const displayController = (() => {
  const boardDiv = document.querySelector("div.board");
  const messageBox = document.querySelector(".message");

  const displayNames = (players) => {
    const p1Name = document.querySelector(".p1-name-actual-name");
    const p2Name = document.querySelector(".p2-name-actual-name");
    p1Name.textContent = players[0].name;
    p2Name.textContent = players[1].name;
  };

  const closePreGameSetup = () => {
    const setupDiv = document.querySelector("div.pre-game-setup");
    setupDiv.classList.add("close");
  };

  const strikeThru = (combination) => {
    boardDiv.innerHTML +=
      '<canvas class="canvas" width="260" height="260"></canvas>';
    const canvas = document.querySelector("canvas.canvas");
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 4;
    // The following switch statement checks for the winning combination of cells(index numbers), and creates a line striking thru it
    switch (combination.join("")) {
      case "036":
        ctx.moveTo(43.37, 0);
        ctx.lineTo(43.37, 260);
        break;
      case "147":
        ctx.moveTo(130, 0);
        ctx.lineTo(130, 260);
        break;
      case "258":
        ctx.moveTo(216.69, 0);
        ctx.lineTo(216.69, 260);
        break;
      case "012":
        ctx.moveTo(0, 43.37);
        ctx.lineTo(260, 43.37);
        break;
      case "345":
        ctx.moveTo(0, 130);
        ctx.lineTo(260, 130);
        break;
      case "678":
        ctx.moveTo(0, 216.69);
        ctx.lineTo(260, 216.69);
        break;
      case "048":
        ctx.moveTo(0, 0);
        ctx.lineTo(260, 260);
        break;
      case "642":
        ctx.moveTo(0, 260);
        ctx.lineTo(260, 0);
        break;
    }
    ctx.stroke();
  };

  const displayBoard = () => {
    let html = "";
    for (let i = 0; i < gameBoard.board.length; i++) {
      html += `<div class="cell${i} ${i}">${gameBoard.board[i]}</div>`;
    }
    boardDiv.innerHTML = html;
    displayCurrentPlayer();
    displayScores();
  };

  const displayCurrentPlayer = () => {
    const p1 = playerSetup.players[0].name;
    const p2 = playerSetup.players[1].name;
    if (gamePlay.getIsItP1sTurn())
      messageBox.textContent = `It's ${p1}'s turn!`;
    else messageBox.textContent = `It's ${p2}'s turn!`;
  };

  const displayScores = () => {
    const scoreP1 = document.querySelector(".score-p1");
    const scoreP2 = document.querySelector(".score-p2");
    scoreP1.textContent = playerSetup.players[0].score;
    scoreP2.textContent = playerSetup.players[1].score;
  };

  const updateMessage = (message) => {
    messageBox.textContent = message;
  };

  return {
    displayNames,
    displayBoard,
    displayScores,
    updateMessage,
    closePreGameSetup,
    strikeThru,
  };
})();

const makePlayer = (nameInputEl) => {
  let marker;
  if (nameInputEl.id === "p1-name") marker = "X";
  if (nameInputEl.id === "p2-name") marker = "O";
  const name = nameInputEl.value;
  let score = 0;

  return {
    marker,
    name,
    score,
  };
};
