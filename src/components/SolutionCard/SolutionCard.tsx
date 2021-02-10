import React from 'react';
import './SolutionCard.css';
import { Card, CardContent, Typography } from '@material-ui/core';
// import BoardDisplay from '../BoardDisplay';
import { Board } from '../../Board';
import PathFinder from '../../PathFinder';
import SolutionRow from '../SolutionRow/SolutionRow';

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

            card_content.push(
                <div className='soln_card_stats_container'>
                    <div className='soln_card_stats_row_container'>
                        <div className='soln_card_stats_row_title'>
                            <Typography variant='h5'>
                                Number of Knight Moves
                            </Typography>
                        </div>
                        <div className='soln_card_stats_row_data'>
                            <Typography variant='h5'>
                                {solns.length > 0 ? (solns[0].length - 1) : 'N/A'}
                            </Typography>
                        </div>
                    </div>
                    <div className='soln_card_stats_row_container'>
                        <div className='soln_card_stats_row_title'>
                            <Typography variant='h5'>
                                Number of Shortest Paths
                            </Typography>
                        </div>
                        <div className='soln_card_stats_row_data'>
                            <Typography variant='h5'>
                                {solns.length > 0 ? solns.length : 'N/A'}
                            </Typography>
                        </div>
                    </div>
                </div >
            );
            card_content.push(
                <div className='flex_v'>
                    {solns.map((soln: Board[], i: number) => (
                        <SolutionRow boards={soln} number={i + 1} />
                    ))}
                </div>
            );

            // Blank view
        } else {
            card_content.push(
                <div>
                    <Typography variant='h5'>
                        Place the start and finish.
                    </Typography>
                </div>
            );
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