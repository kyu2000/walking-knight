import PathFinder from './PathFinder';
import PathHead from './PathHead';
import { Board, Coord, BoardPiece } from '../Board';

export default class PathFinderGeneral extends PathFinder {

    public constructor(board: Board) {
        super(board);
    }

    public solve(): Board[][] {
        // Modified BFS
        const queue: PathHead[] = [new PathHead([this.start], this.board.clone())];
        const paths: Coord[][] = [];
        let reached_dest: number = -1;

        let node: PathHead;
        while (queue.length > 0) {
            node = queue.shift()!;

            const coord: Coord = node.last_coord;
            if (reached_dest > 0 && reached_dest < node.path_length) {
                break;
            } else if (coord.row === this.dest.row && coord.col === this.dest.col) {
                paths.push(node.path);
                reached_dest = node.path_length;
            } else if (reached_dest < node.path_length) {
                for (const new_node of node.split_into_neighbours()) {
                    queue.push(new_node);
                }
            }
        }
        return paths.map(path => {
            const result_path: Board[] = [];
            let board = this.board;
            for (let i = 0; i < path.length; ++i) {
                board = board.clone();
                if (i > 0) {
                    if (i > 1) {
                        board.set_piece(BoardPiece.None, path[i - 2].row, path[i - 2].col);
                    }
                    board.move_piece(path[i - 1].row, path[i - 1].col, path[i].row, path[i].col);
                }
                result_path.push(board);
            }
            return result_path;
        });
    }
}