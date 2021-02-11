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

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get squares(): BoardPiece[][] {
        return this._squares;
    }

    public get_piece(row: number, col: number) {
        return this._squares[row][col];
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

    public valid_coord(row: number, col: number): boolean {
        return (
            0 <= row && row < this.height &&
            0 <= col && col < this.width
        );
    }

    public calculate_sight(board_sight: boolean[][], as_piece: BoardPiece, row: number, col: number): void {
        const obstacles: BoardPiece[] = [
            BoardPiece.WhiteKnight,
            BoardPiece.WhiteBishop,
            BoardPiece.WhiteRook,
            BoardPiece.WhiteQueen,
        ];
        let delta_x: number[] = [];
        let delta_y: number[] = [];
        switch (as_piece) {
            case BoardPiece.WhiteKnight:
                delta_x = [-2, -2, -1, -1, 1, 1, 2, 2];
                delta_y = [-1, 1, -2, 2, -2, 2, -1, 1];
                for (let i = 0; i < 8; i++) {
                    const new_row: number = row + delta_x[i];
                    const new_col: number = col + delta_y[i];
                    if (this.valid_coord(new_row, new_col)) {
                        board_sight[new_row][new_col] = true;
                    }
                }
                return;
            case BoardPiece.WhiteBishop:
                delta_x = [-1, -1, 1, 1];
                delta_y = [-1, 1, -1, 1];
                break;

            case BoardPiece.WhiteRook:
                delta_x = [-1, 0, 0, 1];
                delta_y = [0, -1, 1, 0];
                break;
        }
        for (let i = 0; i < 4; i++) {
            let new_row: number = row;
            let new_col: number = col;
            let keep_looping: boolean = true;
            while (keep_looping) {
                new_row += delta_x[i];
                new_col += delta_y[i];
                if (!this.valid_coord(new_row, new_col)) break;
                if (obstacles.includes(this.squares[new_row][new_col])) {
                    keep_looping = false;
                }
                board_sight[new_row][new_col] = true;
            }
        }
    }

    public calculate_defended(): boolean[][] {
        const defended: boolean[][] = new Array(this.height);
        for (let i = 0; i < this.height; i++) {
            defended[i] = new Array(this.width);
            defended[i].fill(false);
        }

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                switch (this.squares[i][j]) {
                    case BoardPiece.WhiteKnight:
                    case BoardPiece.WhiteBishop:
                    case BoardPiece.WhiteRook:
                        this.calculate_sight(defended, this.squares[i][j], i, j);
                        break;
                    case BoardPiece.WhiteQueen:
                        this.calculate_sight(defended, BoardPiece.WhiteBishop, i, j);
                        this.calculate_sight(defended, BoardPiece.WhiteRook, i, j);
                        break;
                }
            }
        }
        return defended;
    }
}

export default Board;