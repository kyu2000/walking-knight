import './PieceButton.css';
import { Tooltip } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import { piece_to_svg } from '../BoardDisplay';
import { BoardPiece } from '../../Board';

interface IPieceButtonProps {
    piece: BoardPiece,
    selected: BoardPiece,
    on_change: () => void,
    tooltip: string
}

export const PieceButton = ({ piece, selected, on_change, tooltip }: IPieceButtonProps) => (
    <div className='piece_button'>
        <Tooltip
            title={tooltip}
            arrow
            enterDelay={500}
            enterNextDelay={500}
        >
            <ToggleButton
                selected={selected === piece}
                onChange={on_change}
                size='small'
            >
                <div className='piece_button_inside_container'>
                    {piece_to_svg(piece)}
                </div>
            </ToggleButton>
        </Tooltip>
    </div>
);