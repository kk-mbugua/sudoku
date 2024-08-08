
import { BoardType, Difficulty } from "./definitions";
import { generateEmptyBoard, deepCopy2DArray } from "./utils";

class Sudoku {
    size: number = 9;
    board: BoardType;
    gameBoard: BoardType;
    ogGameBoard: BoardType;
    gameBoardSet: boolean = false;
    isValid: boolean | undefined;
    difficulty: Difficulty = "easy"

    constructor(gameBoard?: BoardType) {
        this.board = generateEmptyBoard();
        this.gameBoard = gameBoard ? gameBoard : generateEmptyBoard();   
        this.ogGameBoard = gameBoard ? gameBoard : generateEmptyBoard();   
    }

    updateCell(row: number, col: number, value: number | undefined) {
        if (this.ogGameBoard[row][col] === undefined) {
          this.gameBoard[row][col] = value;
        }
    }
    
    solveBoard(row:number = 0, col:number = 0):boolean {
        // Check if we have reached the end of the matrix
        if (row >= this.size) {
            return true;
        }

        // Move to the next row if we have reached the end of the current row
        if (col >= this.size) {
            return this.solveBoard(row+1, 0);
        }

        // Skip cells that are already filled
        if (this.board[row][col] !== undefined) {
            return this.solveBoard(row, col+1);
        }

        // Try filling the current cell with a valid value
        for (let num = 1; num <= this.size; num++) {
            if (this.isValidInput(num, row, col)) {
                this.board[row][col] = num;
                if (this.solveBoard(row, col + 1)) {
                    return true;
                }
                this.board[row][col] = undefined;
            }
        }

        // No valid value was found, so backtrack
        return false;
    }
    
    removeNDigits(n: number) {
        const maxRetries = 100; // Limit to prevent infinite loop
        let retries = 0;
    
        while (n > 0 && retries < maxRetries) {
            retries++;
            const row = Math.floor(Math.random() * this.size);
            const col = Math.floor(Math.random() * this.size);
    
            if (this.gameBoard[row][col] !== undefined) {
                const backup = this.gameBoard[row][col];
                this.gameBoard[row][col] = undefined;
    
                // Make a deep copy of the board to check its solvability
                const boardCopy: BoardType = this.gameBoard.map(row => [...row]);
    
                if (this.solveBoard(0, 0)) {
                    // If the board is still solvable, keep the change
                    n--;
                } else {
                    // Restore the value if the board becomes unsolvable
                    this.gameBoard[row][col] = backup;
                }
            }
        }
    
        if (retries >= maxRetries) {
            console.warn("Max retries reached while removing digits.");
        }
    }
    
    
    generateGameBoard(difficulty?: Difficulty) {
        if (this.gameBoardSet) return this.gameBoard;
        // Create a shuffled array of numbers from 1 to 9
        const shuffledNumbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
        // Initialize the first row with the shuffled numbers
        this.board[0] = shuffledNumbers;
        // Complete the rest of the board using the solveBoard function
        this.solveBoard();

        this.gameBoard = this.board.map(row => [...row]);
        switch (difficulty) {
            case "easy":
                this.removeNDigits(20);
                break;
            case "medium":
                this.removeNDigits(40);
                break;
            case "hard":
                this.removeNDigits(60);
                break;
            default:
                this.removeNDigits(20);
                break;
        }
        this.gameBoardSet = true;
        this.ogGameBoard = deepCopy2DArray(this.gameBoard)
        return this.gameBoard;
    }

    resetGameBoard(): BoardType {
        this.gameBoard = this.ogGameBoard;
        return this.gameBoard
    }

    isValidBoard(board: BoardType = this.gameBoard): boolean {
        const boxes: {[key: string]: Set<number|undefined>} = {};
        for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
                boxes[`${k},${l}`] = new Set();
            }
        }
    
        for (let i = 0; i < this.size; i++) {
            const row_set = new Set();
            const col_set = new Set();
            for (let j = 0; j < this.size; j++) {
                const row_val = board[i][j];
                const col_val = board[j][i];
                const k = Math.floor(i / 3);
                const l = Math.floor(j / 3);
                if (row_val !== undefined && (row_set.has(row_val) || boxes[`${k},${l}`].has(row_val))) return false;
                if (col_val !== undefined && col_set.has(col_val)) return false;
    
                row_set.add(row_val);
                col_set.add(col_val);
                boxes[`${k},${l}`].add(row_val);
            }
        }
        return true;
    }
    
    isValidInput(val: number, row: number, col: number): boolean {
        return this.getClashes(val, row, col).length === 0;
    }

    isValidInputRow(val: number, row: number, col: number, board: BoardType): [number,number][] {
        const clashes: [number, number][] = []
        for (let i=0; i<this.size; i++) {
            if (i === col) continue;
            if (board[row][i] === val) clashes.push([row, i]);
        }
        return clashes
    }

    isValidInputCol(val: number, row:number, col:number, board: BoardType): [number,number][] {
        const clashes: [number, number][] = []
        for (let i=0; i<this.size; i++) {
            if (i === row) continue;
            if (board[i][col] === val) clashes.push([row, i]);
        }
        return clashes
    }

    isValidInputBox(val: number, row: number, col: number, board: BoardType): [number, number][] {
        const clashes: [number, number][] = []
        const root: number = Math.sqrt(this.size)
        const startRow = Math.floor(row/root) * root;
        const startCol = Math.floor(col/root) * root;
        for (var i=startRow; i<startRow+root; i++) {
            for (var j=startCol; j<startCol+root; j++) {
                if (i===row && j===col) continue;
                if (board[i][j] === val) clashes.push([i, j]);
            }
        }
        return clashes;
    }

    getClashes(val: number, row: number, col: number, useGameBoard: boolean=false): [number, number][] {
        const clashes: [number, number][] = [];
        const toUse = useGameBoard ? this.gameBoard : this.board
        clashes.push(...this.isValidInputRow(val, row, col, toUse));
        clashes.push(...this.isValidInputCol(val, row, col, toUse));
        clashes.push(...this.isValidInputBox(val, row, col, toUse));
        return clashes;
      }

    isCorrectValue(val: number|undefined, row: number, col: number): boolean {
        return this.board[row][col] === val;
    }

    possibleInputs(row: number, col: number): number[] {
        const res = []
        for (var val = 1; val<=this.size; val++) {
            if (this.isValidInput(val, row, col)) res.push(val)
        }
        return res;
    }

    checkWin(): boolean {
        for (var row = 0; row<this.size; row++) {
            for (var col = 0; col<this.size; col++) {
                if (this.gameBoard[row][col] !== this.board[row][col]) return false;
            }
        }
        return true
    }
}

export default Sudoku

