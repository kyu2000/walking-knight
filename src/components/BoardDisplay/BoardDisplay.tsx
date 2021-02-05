import React from 'react';
import './BoardDisplay.css';
import { Board, display_board_piece } from '../../Board';

interface IBoardDisplayProps {
    board: Board,
    on_click: (row: number, col: number) => (() => void)
}

export default class BoardDisplay extends React.Component<IBoardDisplayProps, {}> {
    // eslint-disable-next-line
    constructor(props: IBoardDisplayProps) {
        super(props);
    }

    render() {

        const rows = Array(this.props.board.height);
        for (let i = 0; i < this.props.board.height; i++) {
            rows[i] = Array(this.props.board.width);
            for (let j = 0; j < this.props.board.width; j++) {
                const colour = (i + j) % 2 === 0 ? "white" : "black";
                rows[i][j] = (
                    <td className={colour} onClick={this.props.on_click(i, j)}>
                        <div style={{ width: 0, height: 0, fontSize: 72, display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column" }}>
                            {display_board_piece(this.props.board.squares[i][j])}
                        </div>
                    </td>
                );
            }
        }

        return (
            <table className={"chessboard"}>
                {rows.map(value => (
                    <tr>
                        {value}
                    </tr>
                ))}
            </table>
        );
    }
}