import React from 'react';
import './InteractiveBoard.css';
import { Paper, Card, CardContent, Divider, Typography, Button } from '@material-ui/core';
import BoardDisplay from '../BoardDisplay';
import PieceButton from '../PieceButton';
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
            <div className='flex_vcenter int_board_container'>
                <div className='inline_flex_hcenter'>
                    <div>
                        <Paper elevation={4} square>
                            {/* TODO: adapt width, height to viewport */}
                            <div style={{ width: 600, height: 600 }}>
                                <BoardDisplay board={board} on_click={this.handle_click} />
                            </div>
                        </Paper>
                    </div>

                    <Card className='piece_card_container'>
                        <CardContent>
                            <Typography variant='h5' color='textSecondary'>
                                Start
                            </Typography>
                            <PieceButton
                                selected={this.state.selected}
                                piece={BoardPiece.BlackKnight}
                                on_change={() => {
                                    this.setState({ selected: BoardPiece.BlackKnight })
                                }}
                            />

                            <Divider style={{ margin: '15px 0px' }} />

                            <Typography variant='h5' color='textSecondary'>
                                Finish
                            </Typography>
                            <PieceButton
                                selected={this.state.selected}
                                piece={BoardPiece.Dest}
                                on_change={() => {
                                    this.setState({ selected: BoardPiece.Dest })
                                }}
                            />

                            <Divider style={{ margin: '15px 0px' }} />

                            <Typography variant='h5' color='textSecondary'>
                                Obstacles
                            </Typography>
                            {[
                                BoardPiece.WhiteKnight,
                                BoardPiece.WhiteBishop,
                                BoardPiece.WhiteRook,
                                BoardPiece.WhiteQueen
                            ].map(piece => (
                                <PieceButton
                                    selected={this.state.selected}
                                    piece={piece}
                                    on_change={() => {
                                        this.setState({ selected: piece })
                                    }}
                                />
                            ))
                            }

                            <Divider style={{ margin: '15px 0px' }} />

                            <Typography variant='h5' color='textSecondary'>
                                Delete
                            </Typography>
                            <PieceButton
                                selected={this.state.selected}
                                piece={BoardPiece.None}
                                on_change={() => {
                                    this.setState({ selected: BoardPiece.None })
                                }}
                            />
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
                        Calculate Shortest Paths
                    </Button>
                </div>
            </div>
        );
    }
}