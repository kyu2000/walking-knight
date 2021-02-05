import React from 'react';
import './App.css';
import 'typeface-roboto';
import InteractiveBoard from '../InteractiveBoard';
import { BoardPiece } from '../../Board'

export default function App() {
    return (
        <div>
            <InteractiveBoard selected_default={BoardPiece.BlackKnight} />
        </div>
    );
}