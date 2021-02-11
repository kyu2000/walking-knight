import './PieceButton.css';
import { ToggleButton } from '@material-ui/lab';
import { piece_to_svg } from '../BoardDisplay';
import { BoardPiece } from '../../Board';

interface IPieceButtonProps {
    piece: BoardPiece,
    selected: BoardPiece,
    on_change: () => void,
}

export const PieceButton = ({ piece, selected, on_change }: IPieceButtonProps) => (
    <div className='piece_button'>
        <ToggleButton
            selected={selected === piece}
            onChange={on_change}
            size='small'
        >
            <div className='piece_button_inside_container'>
                {piece_to_svg(piece)}
            </div>
        </ToggleButton>
    </div>
);