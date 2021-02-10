import BoardPiece from './BoardPiece';

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

    public move_piece(src_row: number, src_col: number, dest_row: number, dest_col: number): void {
        if (src_row < 0 || src_row >= this._height) {
            throw new Error(`set_piece: row is invalid row=${src_row}, height=${this._height}`);
        }
        if (src_col < 0 || src_col >= this._width) {
            throw new Error(`set_piece: col is invalid col=${src_col}, width=${this._width}`);
        }
        if (dest_row < 0 || dest_row >= this._height) {
            throw new Error(`set_piece: row is invalid row=${dest_row}, height=${this._height}`);
        }
        if (dest_col < 0 || dest_col >= this._width) {
            throw new Error(`set_piece: col is invalid col=${dest_col}, width=${this._width}`);
        }
        const piece: BoardPiece = this._squares[src_row][src_col];
        this._squares[src_row][src_col] = BoardPiece.Prev;
        this._squares[dest_row][dest_col] = piece;
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

    public exists_start_and_dest(): boolean {
        let exists_start = false;
        let exists_dest = false;
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                switch (this.squares[i][j]) {
                    case BoardPiece.BlackKnight:
                        exists_start = true;
                        break;
                    case BoardPiece.Dest:
                        exists_dest = true;
                        break;
                }
            }
        }
        return exists_start && exists_dest;
    }
}

export default Board;