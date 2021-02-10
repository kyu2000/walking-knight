import React from 'react';
import './SolutionCard.css';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import BoardDisplay from '../BoardDisplay';
import { Board } from '../../Board';
import PathFinder from '../../PathFinder';

interface ISolutionCardProps {
    board: Board
}

export default class SolutionCard extends React.Component<ISolutionCardProps, {}> {
    constructor(props: ISolutionCardProps) {
        super(props);
    }

    render(): JSX.Element {
        let card_content: JSX.Element[] = [];

        if (this.props.board.exists_start_and_dest()) {
            const pf: PathFinder = new PathFinder(this.props.board);
            const solns: Board[][] = pf.solve();
            const jsx_solns: JSX.Element[] = [];
            for (let i = 0; i < solns.length; ++i) {
                if (i !== 0) {
                    jsx_solns.push(<Divider style={{ margin: 5 }} />);
                }

                const jsx_soln_row: JSX.Element[] = [];
                for (let j = 0; j < solns[i].length; ++j) {
                    if (j !== 0) {
                        jsx_soln_row.push(<Divider orientation='vertical' flexItem style={{ margin: 5 }} />);
                    }
                    jsx_soln_row.push(
                        <div style={{ width: 250, height: 250 }}>
                            <BoardDisplay
                                board={solns[i][j]}
                                on_click={(row: number, col: number) => (() => { })}
                            />
                        </div>
                    );
                }
                jsx_solns.push(
                    <div className='inline_flex_h'>
                        {jsx_soln_row}
                    </div>
                );
            }
            card_content.push(
                <div>
                    <Typography variant='h5'>
                        Number of hops: {solns.length > 0 ? (solns[0].length - 1) : 'N/A'}
                    </Typography>
                    <Typography variant='h5'>
                        Number of shortest paths: {solns.length > 0 ? solns.length : 'N/A'}
                    </Typography>
                </div>
            );
            card_content.push(<div className='flex_v'>{jsx_solns}</div>);
        }

        return (
            <Card>
                <CardContent>
                    {card_content}
                </CardContent>
            </Card>
        );
    }
}