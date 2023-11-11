import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const INITIAL_PLAYERS_NAME = {
  X: "Player 1",
  O: "Player 2",
};

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
};

const deriveWinner = (gameBoard, playerName) => {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstCombination =
      gameBoard[combination[0].row][combination[0].column];
    const secondCombination =
      gameBoard[combination[1].row][combination[1].column];
    const thirdCombination =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstCombination &&
      firstCombination === secondCombination &&
      firstCombination === thirdCombination
    ) {
      winner = playerName[firstCombination];
    }
  }

  return winner;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState(INITIAL_PLAYERS_NAME);

  let gameBoard = deriveGameBoard(gameTurns);
  let winner = deriveWinner(gameBoard, playerName);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleRestart = () => setGameTurns([]);
  const handlePlayerChangeName = (symbol, updatedName) => {
    setPlayerName((currentPlayerName) => {
      return { ...currentPlayerName, [symbol]: updatedName };
    });
  };

  const activePlayer = deriveActivePlayer(gameTurns);
  const handleSelectedPlayer = (rowIndex, colIndex) => {
    setGameTurns((currentTurns) => {
      let currentPlayer = deriveActivePlayer(currentTurns);
      let updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...currentTurns,
      ];
      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={INITIAL_PLAYERS_NAME.X}
            symbol="X"
            isActivePlayer={activePlayer === "X"}
            onChangePlayerName={handlePlayerChangeName}
          />
          <Player
            initialName={INITIAL_PLAYERS_NAME.O}
            symbol="O"
            isActivePlayer={activePlayer === "O"}
            onChangePlayerName={handlePlayerChangeName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onSelectActivePlayer={handleSelectedPlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
