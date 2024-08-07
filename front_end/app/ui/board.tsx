"use client";

import { memo } from "react";
import Cell from "./cell";
import { BoardType } from "../lib/definitions";
import Sudoku from "../lib/sudoku";

type BoardProps = {
    sudoku: Sudoku,
    board: BoardType,
    selected: [number, number],
    showErrors: boolean,
    onCellClick: (row: number, col: number) => void;

}

function Board({ sudoku, board, selected, showErrors, onCellClick}: BoardProps) {
    const isPreFilled = (row: number, col: number) => sudoku.ogGameBoard[row][col] !== undefined;
    const hasError = (row: number, col: number) => showErrors && board[row][col] !== undefined && !sudoku.isCorrectValue(board[row][col], row, col);
    const tiles = board.map((row, rowIndex) => {
        const cells = row.map((col, colIndex) => {
        return (
            <Cell
                isPreFilled={isPreFilled(rowIndex, colIndex)}
                selected={rowIndex === selected[0] && colIndex === selected[1]}
                onSelect={() => onCellClick(rowIndex, colIndex)}
                hasError={hasError(rowIndex, colIndex)}
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
