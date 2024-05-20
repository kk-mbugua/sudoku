"use client";

import { useState, useEffect } from "react";
import Cell from "./cell";
import { BoardType } from "../lib/definitions";
import Sudoku from "../lib/sudoku";
import generateEmptyBoard from "../utilities/emptyBoard"


function Board() {
  const [sudoku] = useState<Sudoku>(new Sudoku);
  const [board, setBoard] = useState<BoardType>(generateEmptyBoard())

  useEffect(() => {
    const temp = sudoku.generateGameBoard("easy")
    console.log("TEMP:", temp)
    console.log(" ")
    console.log(" ")
    setBoard(temp);
  }, []);

  const tiles = board.map((row, rowIndex) => {
    const cells = row.map((cell, colIndex) => {
      return <Cell value={cell} key={`${rowIndex}-${colIndex}`} />;
    });
    return (
      <div className="row flex flex-row" key={rowIndex}>
        {cells}
      </div>
    );
  });

  

  return (
    <div className="board">
      {tiles}
    </div>
  );
}

export default Board;
