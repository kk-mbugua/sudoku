"use client";

import { useState, useEffect, useCallback } from "react";
import Sudoku from "../lib/sudoku";
import Board from "./board";
import { BoardType, Difficulty } from "../lib/definitions";
import { generateEmptyBoard } from "../lib/utils";
import { Switch } from "@headlessui/react";
import GameOptions from "./gameoptions";

const btnClassName = "rounded-lg bg-secondary p-3 mx-4 text-white";

function Game() {
  const [sudoku, setSudoku] = useState<Sudoku>(new Sudoku());
  const [board, setBoard] = useState<BoardType>(generateEmptyBoard());
  const [selected, setSelected] = useState<[number, number]>([0, 0]);
  const [showErrors, setShowErrors] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [solved, setSolved] = useState(false);
  const [isCreatedBoard,setIsCreatedBoard] = useState(false);
  const [notSolvable, setNotSolvable] = useState(false)
  
  useEffect(() => {
    console.log("setting new board")
    newGame("easy")
  }, []);

  const filledGameBoard = () => {
    for (let row=0; row<sudoku.size; row++) {
      for (let col=0; col<sudoku.size; col++) {
        if (sudoku.gameBoard[row][col] ===  undefined) return false;
      }
    }
    return true;
  }

  useEffect(() => {
    if (!filledGameBoard()) {
      return
    }
    const isSolved = sudoku.checkWin();
    if (isSolved) {
      setSolved(isSolved);
    }
  }, [board]);

  const newGame = (difficulty: Difficulty = "medium", board?: BoardType) => {
    if (board) { // create board after user input
      var newSudoku = new Sudoku(board);
      var newBoard = board;
      const solvable = newSudoku.solveBoard();
      if (!solvable) {
        setNotSolvable(true);
        setIsCreatedBoard(true);
      }
    } else { // create new game board from scratch
      var newSudoku = new Sudoku();
      var newBoard = newSudoku.generateGameBoard(difficulty);
      setIsCreatedBoard(false);
      setSolved(false);
    }
      setSudoku(newSudoku);
      setBoard(newBoard);
  };

  const createBoard = (board?: BoardType) => {
    const newSudoku = new Sudoku()
    var newBoard = generateEmptyBoard();
    if (board) {newBoard = board;}
    setSudoku(newSudoku)
    setBoard(newBoard)
    setSolved(false);
    setIsCreatedBoard(true);
  }

  const handleSaveBoard = () => {
    newGame("medium", board)
  }

  //TODO: shift the board to edit mode andtand create a new board from outcome
  const handleEditBoard = () => {
    createBoard(board)
  }

  const updateCell = (row: number, col: number, num: number | undefined) => {
    if (solved) {
      return
    }
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
    const row = selected[0];
    const col = selected[1];
    const key = event.key;
  
    if (key >= '1' && key <= sudoku.size.toString()) {
      const num = parseInt(key, 10);
      // Check if the cell is not part of the original game board
      if (sudoku.ogGameBoard[row][col] === undefined) {
        updateCell(row, col, num);
      }
    }
    if (key === "Backspace") {
      if (sudoku.ogGameBoard[row][col] === undefined) {
        updateCell(row, col, undefined);
      }
    }
  }, [selected, sudoku, updateCell]);
  

  const handleCellClick = (row: number, col: number) => {
    setSelected([row, col]);
  }

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
    for (var i=0; i < sudoku.size; i++) {
        updateCell(selected[0], i, sudoku.board[selected[0]][i])
    }
  }
 
  const handleFillCol = () => {
    for (var i=0; i < sudoku.size; i++) {
        updateCell(i, selected[1], sudoku.board[i][selected[1]])
    }
  }
  return (
    <div>
        <div className="flex flex-row">
          <GameOptions newGame={newGame} createBoard={createBoard}/>
          {isCreatedBoard && 
            <div>
              <button className="rounded-md bg-secondary p-1 mx-4 text-white" onMouseUp={handleSaveBoard}>Save Board</button>
              <button className="rounded-md bg-secondary p-1 mx-4 text-white" onMouseUp={handleEditBoard}>Edit Board</button>
            </div>
          }
        </div>
        <Board sudoku={sudoku} board={board} selected={selected} onCellClick={handleCellClick} showErrors={showErrors} showHints={showHints}/>
        {(filledGameBoard() && ! solved) && <div className="text-red-700">There are some errors on the board</div>}
        {solved && <div className="text-emerald-600">Congratulations! Board is solved</div>}
        {notSolvable && <div className="text-red-700">This board is not solvable</div>}
        <div className="flex flex-row justify-between items-center">
            <button className={btnClassName} onMouseUp={handleResetBoard}>Reset Board</button>
            <button className={btnClassName} onMouseUp={handleClearCell}>Clear Cell</button>
            <button className={btnClassName} onMouseUp={handleFillCell}>Fill Cell</button>
            <button className={btnClassName} onMouseUp={handleFillRow}>Fill Row</button>
            <button className={btnClassName} onMouseUp={handleFillCol}>Fill Column</button>
            <div className="bg-secondary text-white p-2 rounded-lg mx-4 flex flex-row space-around justify-between items-center">
                <Switch
                    checked={showErrors}
                    onChange={setShowErrors}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-cyan-600 mr-2"
                >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                </Switch>
                <span>Show Errors</span>
            </div>
            <div className="bg-secondary text-white p-2 rounded-lg mx-4 flex flex-row space-around justify-between items-center">
                <Switch
                    checked={showHints}
                    onChange={setShowHints}
                    // disabled={true}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-cyan-600 mr-2"
                >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                </Switch>
                <span>Show Hints</span>
            </div>
        </div>
    </div>
  );
}

export default Game;
