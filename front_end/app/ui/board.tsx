"use client";

import { useState } from "react"
import Cell from "./cell"

function Board() {
   const [board, setBoard] = useState(Array(9).fill(Array(9).fill(undefined)));
   const tiles = board.map((row, rowIndex) => {
    return row.map((cell: number | undefined, colIndex: any) => {
        return <Cell value={cell} key={`${rowIndex},${colIndex}`}/>
    })

   })
return (
    <div className="board grid-cols-9">
        {tiles}
    </div>
)
}

export default Board