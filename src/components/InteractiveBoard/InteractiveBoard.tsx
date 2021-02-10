import React from 'react';
import './InteractiveBoard.css';
import { Paper, Card, CardContent, Divider, Typography, Button } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import BoardDisplay from '../BoardDisplay';
import { Board, BoardPiece } from '../../Board';

interface IInteractiveBoardProps {
    selected_default: BoardPiece,
    board_default: Board,
    on_calculate: (board: Board) => (() => void)
}

interface IInteractiveBoardState {
    selected: BoardPiece,
    board: Board
}

export default class InteractiveBoard extends React.Component<IInteractiveBoardProps, IInteractiveBoardState> {
    constructor(props: IInteractiveBoardProps) {
        super(props);
        this.state = {
            selected: props.selected_default,
            board: props.board_default
        };

        this.handle_click = this.handle_click.bind(this);
    }

    handle_click(row: number, col: number): () => void {
        return () => {
            const new_board: Board = this.state.board.clone();

            // Uniqueness check
            switch (this.state.selected) {
                case BoardPiece.BlackKnight:
                case BoardPiece.Dest:
                    new_board.find_all_and_delete(this.state.selected);
                    break;
            }

            new_board.squares[row][col] = this.state.selected;
            this.setState({ board: new_board });
        }
    }

    render(): JSX.Element {
        const board: Board = this.state.board;

        return (
            <div className='flex_vcenter'>
                <div className='inline_flex_hcenter'>
                    <div>
                        <Paper elevation={5} square>
                            <div style={{ width: 600, height: 600 }}>
                                <BoardDisplay board={board} on_click={this.handle_click} />
                            </div>
                        </Paper>
                    </div>

                    <Card style={{ marginLeft: 20 }}>
                        <CardContent>
                            <Typography variant='h5' color='textSecondary'>
                                Start
                            </Typography>
                            <ToggleButton
                                selected={this.state.selected === BoardPiece.BlackKnight}
                                onChange={() => {
                                    this.setState({ selected: BoardPiece.BlackKnight })
                                }}
                            >
                                ♞
                            </ToggleButton>

                            <Divider />

                            <Typography variant='h5' color='textSecondary'>
                                Finish
                            </Typography>
                            <ToggleButton
                                selected={this.state.selected === BoardPiece.Dest}
                                onChange={() => {
                                    this.setState({ selected: BoardPiece.Dest })
                                }}
                            >
                                Fin
                            </ToggleButton>

                            <Divider />

                            <Typography variant='h5' color='textSecondary'>
                                Obstacles
                            </Typography>
                            <ToggleButton
                                selected={this.state.selected === BoardPiece.WhiteKnight}
                                onChange={() => {
                                    this.setState({ selected: BoardPiece.WhiteKnight })
                                }}
                            >
                                ♘
                            </ToggleButton>
                            <ToggleButton
                                selected={this.state.selected === BoardPiece.WhiteBishop}
                                onChange={() => {
                                    this.setState({ selected: BoardPiece.WhiteBishop })
                                }}
                            >
                                ♗
                            </ToggleButton>
                            <ToggleButton
                                selected={this.state.selected === BoardPiece.WhiteRook}
                                onChange={() => {
                                    this.setState({ selected: BoardPiece.WhiteRook })
                                }}
                            >
                                ♖
                            </ToggleButton>
                            <ToggleButton
                                selected={this.state.selected === BoardPiece.WhiteQueen}
                                onChange={() => {
                                    this.setState({ selected: BoardPiece.WhiteQueen })
                                }}
                            >
                                ♕
                            </ToggleButton>

                            <Divider />

                            <Typography variant='h5' color='textSecondary'>
                                Delete
                            </Typography>
                            <ToggleButton
                                selected={this.state.selected === BoardPiece.None}
                                onChange={() => {
                                    this.setState({ selected: BoardPiece.None })
                                }}
                            >
                                Del
                            </ToggleButton>
                        </CardContent>
                    </Card>
                </div>
                <div className='inline_flex_hcenter calculate_button_container'>
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={!board.exists_start_and_dest()}
                        onClick={this.props.on_calculate(board)}
                    >
                        Calculate
                    </Button>
                </div>
            </div>
        );
    }
}