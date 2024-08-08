"use client";

import { memo, useCallback } from "react";
import Cell from "./cell";
import { BoardType } from "../lib/definitions";
import Sudoku from "../lib/sudoku";

type BoardProps = {
    sudoku: Sudoku,
    board: BoardType,
    selected: [number, number],
    showErrors: boolean,
    showHints: boolean,
    onCellClick: (row: number, col: number) => void;

}

function Board({ sudoku, board, selected, showErrors, showHints, onCellClick}: BoardProps) {
    const isPreFilled = (row: number, col: number) => sudoku.ogGameBoard[row][col] !== undefined;
    const hasError = (row: number, col: number) => showErrors && board[row][col] !== undefined && !sudoku.isCorrectValue(board[row][col], row, col);
    const isHint = useCallback((row: number, col:number): boolean => {
        if (board[selected[0]][selected[1]] !== undefined && showHints) {
            const value = board[selected[0]][selected[1]]!;
            const clashes = sudoku.getClashes(value, selected[0], selected[1], true);
            for (let i = 0; i<clashes.length; i++) {
                if (JSON.stringify(clashes[i]) === JSON.stringify([row, col]) && board[clashes[i][0]][clashes[i][1]] === board[selected[0]][selected[1]]) {
                    return true;
                }
            }
        }
        return false;
    }, [selected, board, showHints])

    const tiles = board.map((row, rowIndex) => {
        const cells = row.map((col, colIndex) => {
            return (
                <Cell
                    isPreFilled={isPreFilled(rowIndex, colIndex)}
                    isSelected={rowIndex === selected[0] && colIndex === selected[1]}
                    onCellClick={() => onCellClick(rowIndex, colIndex)}
                    hasError={hasError(rowIndex, colIndex)}
                    isHint={isHint(rowIndex, colIndex)}
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
