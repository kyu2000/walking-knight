import PathFinder from './PathFinder';
import Board from "../Board/Board";
import Coord from "../Board/Coord";
import { BoardPiece } from '../Board';

class PathFinderKnightOnly extends PathFinder {

    private _adjacency_list: number[][] = [];

    public constructor(board: Board) {
        super(board);
        this.init_adjacency_list();
    }

    private convert_coord_to_vertex(coord: Coord): number {
        return this.board.height * coord.row + coord.col;
    }

    private convert_vertex_to_coord(vertex: number): Coord {
        const col = vertex % this.board.height;
        const row = (vertex - col) / this.board.height;
        return { row: row, col: col };
    }

    private init_adjacency_list() {
        const list_length = this.board.width * this.board.height;
        const adjacency_list: number[][] = Array(list_length);
        for (let i = 0; i < list_length; i++) {
            adjacency_list[i] = [];
        }

        const row_move = [-2, -2, -1, -1, 1, 1, 2, 2];
        const col_move = [-1, 1, -2, 2, -2, 2, -1, 1];

        for (let row1 = 0; row1 < this.board.height; row1++) {
            for (let col1 = 0; col1 < this.board.width; col1++) {
                const vertex1 = this.convert_coord_to_vertex({ row: row1, col: col1 });

                for (let k = 0; k < 8; k++) {
                    const row2 = row1 + row_move[k];
                    const col2 = col1 + col_move[k];
                    if (0 <= row2 && row2 < this.board.height &&
                        0 <= col2 && col2 < this.board.width) {

                        const vertex2 = this.convert_coord_to_vertex({ row: row2, col: col2 });
                        if (adjacency_list[vertex1].find(el => el === vertex2) === undefined) {
                            adjacency_list[vertex1].push(vertex2);
                            adjacency_list[vertex2].push(vertex1);
                        }
                    }
                }
            }
        }
        this._adjacency_list = adjacency_list;
    }

    // BFS flood
    private get_dist_to_all(): number[] {
        const adjacency_list = this._adjacency_list;
        const dist: number[] = Array(adjacency_list.length);
        dist.fill(-1);

        const start_vertex = this.convert_coord_to_vertex(this.start);
        const queue = [start_vertex];
        dist[start_vertex] = 0;

        let curr_vertex: number;
        while (queue.length > 0) {
            curr_vertex = queue.shift()!;
            for (const neigh_vertex of adjacency_list[curr_vertex]) {
                if (dist[neigh_vertex] === -1) {
                    dist[neigh_vertex] = dist[curr_vertex] + 1;
                    queue.push(neigh_vertex);
                }
            }
        }
        return dist;
    }

    public solve(): Board[][] {
        const adjacency_list = this._adjacency_list;
        const dist: number[] = this.get_dist_to_all();

        // DFS, navigate backwards
        const pred: number[] = Array(adjacency_list.length);
        pred.fill(-1);

        const start_vertex = this.convert_coord_to_vertex(this.start);
        const dest_vertex = this.convert_coord_to_vertex(this.dest);
        const stack = [dest_vertex];

        const paths: number[][] = [];
        let curr_vertex: number;
        while (stack.length > 0) {
            curr_vertex = stack.pop()!;
            if (curr_vertex === start_vertex) {
                // Generate path array
                const path: number[] = [];
                while (curr_vertex !== -1) {
                    path.push(curr_vertex);
                    curr_vertex = pred[curr_vertex];
                }
                paths.push(path);

            } else {
                for (const neigh_vertex of adjacency_list[curr_vertex]) {
                    if (dist[curr_vertex] === dist[neigh_vertex] + 1) {

                        pred[neigh_vertex] = curr_vertex;
                        stack.push(neigh_vertex);
                    }
                }
            }
        }
        return paths.map(path => path.map(vertex => {
            const board = new Board(this.board.width, this.board.height);
            const coord: Coord = this.convert_vertex_to_coord(vertex);
            board.set_piece(BoardPiece.Knight, coord.row, coord.col);
            return board;
        }));
    }
}

export default PathFinderKnightOnly;