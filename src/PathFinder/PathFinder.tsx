import Board from "../Board/Board";

interface Coord {
    row: number,
    col: number
}

abstract class PathFinder {
    private _board: Board;
    private _start: Coord = { row: 0, col: 0 };
    private _dest: Coord = { row: 0, col: 0 };

    public constructor(board: Board) {
        this._board = board;
    }

    private verify_coord(coord: Coord) {
        if (coord.row < 0 || coord.row >= this._board.height) {
            throw new Error("Invalid row: row=${coord.row} board.height=${this._board.height}");
        }

        if (coord.col < 0 || coord.col >= this._board.width) {
            throw new Error("Invalid col: col=${coord.col} board.width=${this._board.width}");
        }
    }
    public set start(coord: Coord) {
        this.verify_coord(coord);
        this._start = coord;
    }

    public set dest(coord: Coord) {
        this.verify_coord(coord);
        this._dest = coord;
    }

    public abstract solve(): Board[][]
}

export default PathFinder;