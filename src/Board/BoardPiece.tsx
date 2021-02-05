enum BoardPiece {
    None,
    BlackKnight,
    Dest,
    WhiteKnight,
    WhiteBishop,
    WhiteRook,
    WhiteQueen
}

export function display_board_piece(piece: BoardPiece): string {
    switch (piece) {
        case BoardPiece.None:
            return " ";
        case BoardPiece.BlackKnight:
            return "♞";
        case BoardPiece.Dest:
            return "🏁";
        case BoardPiece.WhiteKnight:
            return "♘";
        case BoardPiece.WhiteBishop:
            return "♗";
        case BoardPiece.WhiteRook:
            return "♖";
        case BoardPiece.WhiteQueen:
            return "♕";
    }
}

export default BoardPiece;