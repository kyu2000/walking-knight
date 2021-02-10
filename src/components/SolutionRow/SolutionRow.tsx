import React from 'react';
import './SolutionRow.css';
import { Typography } from '@material-ui/core';
import BoardDisplay from '../BoardDisplay';
import { Board } from '../../Board';

interface ISolutionRowProps {
    boards: Board[],
    number: number
}

export default class SolutionRow extends React.Component<ISolutionRowProps, {}> {
    render(): JSX.Element {
        return (
            <div style={{ width: 1000 }}>
                <div className='soln_row_container'>
                    <div className='soln_row_left_tab'>
                        <Typography variant='h5' >
                            {this.props.number}
                        </Typography>
                    </div>
                    <div className='soln_boards_container'  >
                        {this.props.boards.map((board, i) => (
                            <div className='soln_board_container'>
                                <Typography variant='subtitle1' align='center'>
                                    Move {i}
                                </Typography>
                                <div className='soln_board'>

                                    <BoardDisplay
                                        board={board}
                                        on_click={(row: number, col: number) => (() => { })}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}