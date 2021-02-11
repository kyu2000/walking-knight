import { Board, BoardPiece, Coord } from '../Board';

export default class PathHead {
    private _path: Coord[];
    private _board: Board;
    private _blocked: boolean[][];

    public constructor(path: Coord[], board: Board, blocked?: boolean[][]) {
        this._path = path;
        this._board = board;
        this._blocked = blocked ? blocked : board.calculate_defended();
    }

    public get path(): Coord[] {
        return this._path;
    }

    public get path_length(): number {
        return this._path.length;
    }

    public get last_coord(): Coord {
        return this._path.slice(-1)[0];
    }

    public get_neighbours(): Coord[] {
        const neighbours: Coord[] = [];
        const delta_x: number[] = [-2, -2, -1, -1, 1, 1, 2, 2];
        const delta_y: number[] = [-1, 1, -2, 2, -2, 2, -1, 1];
        for (let i = 0; i < 8; i++) {
            const curr_coord: Coord = this.last_coord;
            const new_row: number = curr_coord.row + delta_x[i];
            const new_col: number = curr_coord.col + delta_y[i];
            if (this._board.valid_coord(new_row, new_col) &&
                !this._blocked[new_row][new_col]) {
                neighbours.push({ row: new_row, col: new_col });
            }
        }
        return neighbours;
    }

    public split_into_neighbours(): PathHead[] {
        const neighbours: PathHead[] = [];
        const obstacles: BoardPiece[] = [
            BoardPiece.WhiteKnight,
            BoardPiece.WhiteBishop,
            BoardPiece.WhiteRook,
            BoardPiece.WhiteQueen,
        ];

        for (const new_coord of this.get_neighbours()) {
            const new_path = this._path.concat(new_coord)

            // If piece is caputed at new coord
            const piece: BoardPiece = this._board.get_piece(new_coord.row, new_coord.col);
            if (obstacles.includes(piece)) {
                const new_board: Board = this._board.clone();
                new_board.set_piece(BoardPiece.None, new_coord.row, new_coord.col);
                neighbours.push(new PathHead(new_path, new_board));
            } else {
                neighbours.push(new PathHead(new_path, this._board, this._blocked));
            }
        }
        return neighbours;
    }
}