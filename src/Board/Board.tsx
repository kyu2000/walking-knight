import BoardPiece from "./BoardPiece";

// Represents the Board; 
// To be read and represented graphically 
class Board {
    private _width: number = 8;
    private _height: number = 8;
    private _squares: number[][] = [];

    public consturctor(width: number = 8, height?: number) {
        this._width = width;
        this._height = height ? height : width;
        this._squares = Array(this._height).fill(
            Array(this._width).fill(BoardPiece.None)
        );
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get squares(): number[][] {
        return this._squares;
    }

    public set_piece(piece: BoardPiece, row: number, col: number) {
        if (row < 0 || row >= this._height) {
            throw new Error("set_piece: row is invalid row=${row}, height=${this._height}");
        }
        if (col < 0 || col >= this._width) {
            throw new Error("set_piece: col is invalid col=${col}, width=${this._width}");
        }

        this._squares[row][col] = piece;
    }
}

export default Board;