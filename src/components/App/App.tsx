import React from 'react';
import './App.css';
import 'typeface-roboto';
import InteractiveBoard from '../InteractiveBoard';
import SolutionCard from '../SolutionCard';
import { Board, BoardPiece } from '../../Board'

interface IAppState {
    board: Board;
}
export default class App extends React.Component<{}, IAppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            board: new Board(8)
        };
        this.handle_calculate = this.handle_calculate.bind(this);
    }

    handle_calculate(board: Board): () => void {
        return () => {
            this.setState({ board: board.clone() });
        }
    }

    render(): JSX.Element {
        const board = this.state.board;
        return (
            <div className='flex_vcenter'>
                <InteractiveBoard
                    selected_default={BoardPiece.BlackKnight}
                    board_default={board}
                    on_calculate={this.handle_calculate}
                />
                <SolutionCard board={board} />
            </div>
        );
    }
}