"use client"

import { useState, useEffect } from "react";
import Sudoku from "../lib/sudoku";
import Board from "./board"
import { BoardType, Difficulty } from "../lib/definitions";
import generateEmptyBoard from "../utilities/emptyBoard"
import { Switch } from "@headlessui/react"


const btnClassName = "rounded-lg bg-cyan-700 p-3 mx-4"
function Game() {
    const [sudoku] = useState<Sudoku>(new Sudoku);
    const [board, setBoard] = useState<BoardType>(generateEmptyBoard())
    const [showErrors, setShowErrors] = useState(false);
  
    useEffect(() => {
      setBoard(sudoku.generateGameBoard("easy"));
    }, [sudoku]);

    return (
        <div>
            <Board board={board} sudoku={sudoku}/>
            <div className="flex flex-row justify-between">
                <button className={btnClassName}>Fill Cell</button>
                <button className={btnClassName}>Fill Row</button>
                <button className={btnClassName}>Fill Column</button>
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
    )
}

export default Game