
import { BoardType, Difficulty } from "./definitions";
import generateEmptyBoard from "../utilities/emptyBoard";


class Sudoku {
    board: BoardType;
    gameBoardSet: boolean = false;
    gameBoard: BoardType;
    isValid: boolean | undefined;


    constructor(gameBoard?: BoardType) {
        this.board = generateEmptyBoard();
        this.gameBoard = gameBoard ? gameBoard : generateEmptyBoard();    
    }

    fillDiagonal() {
        for (var point = 0; point < 9; point += 3) {
            const values = Array.from({ length: 9 }, (_, i) => i + 1);
            const upperLimit = point+3;
            for (var row = point; row < upperLimit; row++) {
                for (var col = point; col < upperLimit; col++) {
                    const max = values.length-1;
                    const index = Math.floor(Math.random() * (max + 1));
                    const value = values.splice(index, 1)[0];
                    this.board[row][col] = value;
                }   
            }

        }
        
        return []
    }

    fillCell(row: number, col: number, value: number | undefined) {
        this.gameBoard[row][col] = value;
    }
    
    
    solveBoard() {
        return []
    }
    
    removeKDigits(){
    }
    
    generateGameBoard(difficulty: Difficulty) {
        if (this.gameBoardSet) return this.board;
        this.fillDiagonal();
        this.gameBoardSet = true;
        return this.board
        // return this.gameBoard
    }

    isValidBoard(){

    }

}

export default Sudoku



