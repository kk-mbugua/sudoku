import { BoardType } from "./definitions";

export function generateEmptyBoard(): BoardType {
    const res = []
    for (var i = 0; i < 9; i++) {
        res.push(Array(9).fill(undefined));
    }
    return res;
}

export function deepCopy2DArray(arr: (number|undefined)[][]): (number|undefined)[][] {
    const copy: (number | undefined)[][] = [];
    for (const row of arr) {
      copy.push(row.slice()); // Shallow copy of the row
    }
    // Deep copy each element within the copied rows (handling undefined)
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy[i].length; j++) {
        copy[i][j] = arr[i][j] !== undefined ? arr[i][j] : undefined;
      }
    }
    return copy;
  }
