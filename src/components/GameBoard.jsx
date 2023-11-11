import { useState } from "react";

export default function GameBoard({ onSelectActivePlayer, board }) {
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);
  //   const handleSelectedSquare = (rowIndex, colIndex) => {
  //     setGameBoard((currentGameBoard) => {
  //       let updateGameBoard = [
  //         ...currentGameBoard.map((innerArray) => [...innerArray]),
  //       ];
  //       updateGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updateGameBoard;
  //     });

  //     onSelectActivePlayer();
  //   };

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button
                      onClick={() => onSelectActivePlayer(rowIndex, colIndex)}
                      disabled={playerSymbol !== null}
                    >
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
