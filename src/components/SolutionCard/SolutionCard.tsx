import React from 'react';
import './SolutionCard.css';
import { Card, CardContent, createMuiTheme, responsiveFontSizes, Typography, ThemeProvider } from '@material-ui/core';
import { Animated } from 'react-animated-css';
import { Board } from '../../Board';
import PathFinder from '../../PathFinder';
import SolutionRow from '../SolutionRow/SolutionRow';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

interface ISolutionCardProps {
    board: Board
}

export default class SolutionCard extends React.Component<ISolutionCardProps, {}> {
    // eslint-disable-next-line
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
                            <ThemeProvider theme={theme}>
                                <Typography variant='h5'>
                                    Number of Knight Moves
                                </Typography>
                            </ThemeProvider>
                        </div>
                        <div className='soln_card_stats_row_data'>
                            <ThemeProvider theme={theme}>
                                <Typography variant='h5'>
                                    {solns.length > 0 ? (solns[0].length - 1) : 'N/A'}
                                </Typography>
                            </ThemeProvider>
                        </div>
                    </div>
                    <div className='soln_card_stats_row_container'>
                        <div className='soln_card_stats_row_title'>
                            <ThemeProvider theme={theme}>
                                <Typography variant='h5'>
                                    Number of Shortest Paths
                                </Typography>
                            </ThemeProvider>
                        </div>
                        <div className='soln_card_stats_row_data'>
                            <ThemeProvider theme={theme}>
                                <Typography variant='h5'>
                                    {solns.length > 0 ? solns.length : 'N/A'}
                                </Typography>
                            </ThemeProvider>
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

        } else {
            // Blank view
            card_content.push(
                <div>
                    <Typography variant='h5'>
                        Place the start and finish.
                    </Typography>
                </div>
            );
        }
        return (
            <Animated
                animationIn='slideInUp'
                animationInDuration={600}
                animationOut='slideOutDown'
                animationOutDuration={600}
                isVisible={true}
            >
                <Card>
                    <CardContent>
                        {card_content}
                    </CardContent>
                </Card>
            </Animated>
        );

    }
}