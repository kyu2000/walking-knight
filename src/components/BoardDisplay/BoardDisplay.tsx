import React from 'react';
import './BoardDisplay.css';
import DeleteIcon from '@material-ui/icons/Delete';
import * as SVG from './svgs';
import { Board, BoardPiece } from '../../Board';

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
                const colour = (i + j) % 2 === 0 ? 'white' : 'black';
                const piece = this.props.board.squares[i][j];
                rows[i][j] = (
                    <div className={`${colour} chessboard_square`} onClick={this.props.on_click(i, j)} >
                        { piece !== BoardPiece.None && piece_to_svg(piece)
                        }
                    </div >
                );
            }
        }

        return (
            <div className='chessboard' onContextMenu={e => e.preventDefault()} >
                {rows.map(value => (
                    <div className='chessboard_row'>
                        {value}
                    </div>
                ))}
            </div >
        );
    }
}

export function piece_to_svg(piece: BoardPiece): JSX.Element {
    switch (piece) {
        case BoardPiece.None:
            return <DeleteIcon fontSize='large' style={{ color: 'black' }} />;
        case BoardPiece.Prev:
            return <SVG.GreenSquare width='100% ' height='100 % ' viewBox='0 0 45 45' />;
        case BoardPiece.BlackKnight:
            return <SVG.BlackKnight width='100%' height='100%' viewBox='0 0 45 45' />;
        case BoardPiece.Dest:
            return <SVG.WhiteKing width='100%' height='100%' viewBox='0 0 45 45' />;
        case BoardPiece.WhiteKnight:
            return <SVG.WhiteKnight width='100%' height='100%' viewBox='0 0 45 45' />;
        case BoardPiece.WhiteBishop:
            return <SVG.WhiteBishop width='100%' height='100%' viewBox='0 0 45 45' />;
        case BoardPiece.WhiteRook:
            return <SVG.WhiteRook width='100%' height='100%' viewBox='0 0 45 45' />;
        case BoardPiece.WhiteQueen:
            return <SVG.WhiteQueen width='100%' height='100%' viewBox='0 0 45 45' />;
    }
}
