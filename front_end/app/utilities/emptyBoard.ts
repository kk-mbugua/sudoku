import { BoardType } from "../lib/definitions";

export default function generateEmptyBoard(): BoardType {
    const res = []
    for (var i = 0; i < 9; i++) {
        res.push(Array(9).fill(undefined));
    }
    return res;
}
