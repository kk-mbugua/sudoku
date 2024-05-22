"use client";

import { memo } from "react";
import Cell from "./cell";
import { BoardType } from "../lib/definitions";
import Sudoku from "../lib/sudoku";

type BoardProps = {
    sudoku: Sudoku,
    board: BoardType,
    selected: [number, number],
    onCellClick: (row: number, col: number) => void;
}

function Board({ sudoku, board, selected, onCellClick}: BoardProps) {
  const tiles = board.map((row, rowIndex) => {
    const cells = row.map((col, colIndex) => {
      return (
        <Cell
            isPreFilled={sudoku.ogGameBoard[rowIndex][colIndex] !== undefined}
            selected={rowIndex === selected[0] && colIndex === selected[1]}
            onClick={() => onCellClick(rowIndex, colIndex)}
            key={`${rowIndex}-${colIndex}`}
        >
            {col}
        </Cell>
      );
    });
    return (
      <div className="row flex flex-row" key={rowIndex}>
        {cells}
      </div>
    );
  });

  return <div className="board">{tiles}</div>;
}

export default memo(Board);
