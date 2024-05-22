"use client";

import Cell from "./cell";
import { BoardType } from "../lib/definitions";
import Sudoku from "../lib/sudoku";


function Board({ board, sudoku }: { board: BoardType; sudoku: Sudoku }) {
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
