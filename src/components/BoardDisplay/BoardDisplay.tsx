import React from 'react';
import './BoardDisplay.css';
import { Board, BoardPiece } from '../../Board';
import * as SVG from './svgs';

function piece_to_svg(piece: BoardPiece): JSX.Element {
    switch (piece) {
        case BoardPiece.None:
            return <div />;
        case BoardPiece.Prev:
            return <SVG.GreenSquare width='100%' height='100%' viewBox='0 0 45 45' />;
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
                    <div className={colour} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={this.props.on_click(i, j)}>
                        {piece !== BoardPiece.None && piece_to_svg(piece)}
                    </div>
                );
            }
        }

        return (
            <div onContextMenu={e => e.preventDefault()} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {rows.map(value => (
                    <div style={{ height: '100%', display: 'inline-flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        {value}
                    </div>
                ))}
            </div>
        );
    }
}