"use client";

import { useState, useEffect } from "react"
import generateBoard from "../lib/generateBoard"
import Cell from "./cell"

function Board() {
   const [board, setBoard] = useState<(number | undefined)[][]>([]);

   useEffect(() => {
    const initialBoard: number[][] = generateBoard();
    setBoard(initialBoard);
  }, []);

   const tiles = board.map((row, rowIndex) => {
    const cells = row.map((cell: number | undefined, colIndex: number) => {
        return <Cell value={cell} key={`${rowIndex}-${colIndex}`}/>
    })
    return (
        <div className="row flex flex-row" key={rowIndex}>{cells}</div>
    )
   })

   console.log("board:", board)
return (
    <div className="board">
        {tiles}
    </div>
)
}

export default Board