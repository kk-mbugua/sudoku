"use client";

import { useState, useEffect, useCallback } from "react";
import Sudoku from "../lib/sudoku";
import Board from "./board";
import { BoardType, Difficulty } from "../lib/definitions";
import { generateEmptyBoard } from "../lib/utils";
import { Switch } from "@headlessui/react";

const btnClassName = "rounded-lg bg-cyan-700 p-3 mx-4";

function Game() {
  const [sudoku] = useState<Sudoku>(new Sudoku());
  const [board, setBoard] = useState<BoardType>(generateEmptyBoard());
  const [selected, setSelected] = useState<[number, number]>([-1, -1]);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    setBoard(sudoku.generateGameBoard("easy"));
  }, [sudoku]);

  const updateCell = (row: number, col: number, num: number | undefined) => {
    // Update Sudoku instance
    sudoku.updateCell(row, col, num);
    // Update local state using the functional form of setState
    setBoard((prevBoard) =>
      prevBoard.map((r, rowIndex) =>
        r.map((c, colIndex) =>
          rowIndex === row && colIndex === col ? num : c
        )
      )
    );
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (selected[0] !== undefined && selected[1] !== undefined) {
      const row = selected[0];
      const col = selected[1];
      const key = event.key;

      if (key >= '1' && key <= '9') {
        const num = parseInt(key, 10);
        // Check if the cell is not part of the original game board
        if (sudoku.ogGameBoard[row][col] === undefined) {
          updateCell(row,col, num)
        }
      }
    }
  }, [selected, board, sudoku]);

  const handleCellClick = useCallback((row: number, col: number) => {
    setSelected([row, col]);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleResetBoard = () => {
    sudoku.resetGameBoard();
    setBoard(sudoku.gameBoard);
  };

  const handleClearCell = () => {
    updateCell(selected[0], selected[1], undefined)
  }

  const handleFillCell = () => {
    updateCell(selected[0], selected[1], sudoku.board[selected[0]][selected[1]])
  }

  const handleFillRow = () => {
    for (var i=0; i < 9; i++) {
        updateCell(selected[0], i, sudoku.board[selected[0]][i])
    }
  }
 
  const handleFillCol = () => {
    for (var i=0; i < 9; i++) {
        updateCell(i, selected[1], sudoku.board[i][selected[0]])
    }
  }

  return (
    <div>
      <Board sudoku={sudoku} board={board} selected={selected} onCellClick={handleCellClick} />
      <div className="flex flex-row justify-between">
            <button className={btnClassName} onMouseUp={handleResetBoard}>Reset Board</button>
            <button className={btnClassName} onMouseUp={handleClearCell}>Clear Cell</button>
            <button className={btnClassName} onMouseUp={handleFillCell}>Fill Cell</button>
            <button className={btnClassName} onMouseUp={handleFillRow}>Fill Row</button>
            <button className={btnClassName} onMouseUp={handleFillCol}>Fill Column</button>
            <div>
                <Switch
                    checked={showErrors}
                    onChange={setShowErrors}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
                >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                </Switch>
                Show Errors
            </div>
      </div>
    </div>
  );
}

export default Game;
