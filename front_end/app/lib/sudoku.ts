
import { BoardType, Difficulty } from "./definitions";
import generateEmptyBoard from "../utilities/emptyBoard";


class Sudoku {
    board: BoardType;
    size: number = 9;
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
        return this.board
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

    isValidBoard(): boolean{
        const boxes: {[key: string]: Set<number|undefined>} = {};
        for (var k=0; k<3; k++) {
            for (var l=0; l<3; l++){
                boxes[`${k}, ${l}`] = new Set()
            }
        }
        
        for (var i=0; i<9; i++){
            const row_set = new Set();
            const col_set = new Set();
            for (var j=0; j<9; j++){
                const row_val = this.gameBoard[i][j];
                const col_val = this.gameBoard[j][i];
                k = Math.floor(i/3)
                l = Math.floor(j/3)
                if (row_val !== undefined && (row_set.has(row_val) || boxes[`${k}, ${l}`].has(row_val))) return false;

                if (col_val !== undefined && (col_set.has(col_val))) return false;

                row_set.add(row_val)
                col_set.add(col_val)
                boxes[`${k}, ${l}`].add(row_val)  
            }              
        }
        return true;
    }

    isValidInput(val: number, row: number, col: number): boolean {
        return this.isValidInputRow(val, row) && this.isValidInputCol(val, col) && this.isValidInputBox(val, row, col);
    }

    isValidInputRow(val: number, row: number): boolean {
        return !this.board[row].includes(val);
    }

    isValidInputCol(val: number, col:number): boolean {
        for (var i=0; i < 9; i++) {
            if (this.board[i][col] === val) return false;
        }
        return true;
    }

    isValidInputBox(val: number, row: number, col: number): boolean {
        const startRow = Math.floor(row/3);
        const startCol = Math.floor(col/3);
        for (var i=startRow; i<startRow+3; i++) {
            for (var j=startCol; j<startCol+3; j++) {
                if (this.board[i][j] === val) return false;
            }
        }
        return true;
    }

    possibleInputs(row: number, col: number): number[] {
        const res = []
        for (var val = 1; val<=9; val++) {
            if (this.isValidInput(val, row, col)) res.push(val)
        }
        return res;
    }

}

export default Sudoku



