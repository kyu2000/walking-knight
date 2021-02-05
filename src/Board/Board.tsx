import BoardPiece from "./BoardPiece";

// Represents the Board; 
// To be read and represented graphically 
class Board {
    private _width: number = 8;
    private _height: number = 8;
    private _squares: BoardPiece[][] = [];

    public constructor(width: number, height?: number) {
        this._width = width;
        this._height = height ? height : width;
        this._squares = Array(this._height);
        for (let i = 0; i < this._height; i++) {
            this._squares[i] = Array(this._width).fill(BoardPiece.None);
        }
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get squares(): BoardPiece[][] {
        return this._squares;
    }

    public set_piece(piece: BoardPiece, row: number, col: number): void {
        if (row < 0 || row >= this._height) {
            throw new Error(`set_piece: row is invalid row=${row}, height=${this._height}`);
        }
        if (col < 0 || col >= this._width) {
            throw new Error(`set_piece: col is invalid col=${col}, width=${this._width}`);
        }
        this._squares[row][col] = piece;
    }

    public clone(): Board {
        const b: Board = new Board(this.width, this.height);
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                b.squares[i][j] = this.squares[i][j];
            }
        }
        return b;
    }

    public find_all_and_delete(piece: BoardPiece): void {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.squares[i][j] === piece) {
                    this.squares[i][j] = BoardPiece.None;
                }
            }
        }
    }
}

export default Board;