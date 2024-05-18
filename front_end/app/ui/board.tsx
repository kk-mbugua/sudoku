"use client";

import { useState } from "react"
import Cell from "./cell"

function Board() {
   const [board, setBoard] = useState(Array(9).fill(Array(9).fill(7)));
   const tiles = board.map((row, rowIndex) => {
    const cells = row.map((cell: number | undefined, colIndex: any) => {
        return <Cell value={cell} key={`${rowIndex},${colIndex}`}/>
    })
    return (
        <div className="row flex flex-row">{cells}</div>
    )
   })
return (
    <div className="board">
        {tiles}
    </div>
)
}

export default Board