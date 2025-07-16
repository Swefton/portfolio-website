// app/components/AsciiChessBoard.js

'use client';

import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';

const pieceUnicode = {
    p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
    P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔',
    '.': '·'
};

const generateAsciiBoard = (board) => {
    let display = '';
    for (let i = 7; i >= 0; i--) {
        display += (i + 1) + ' ';
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j];
            display += piece ? pieceUnicode[piece.color === 'w' ? piece.type.toUpperCase() : piece.type] + ' ' : pieceUnicode['.'] + ' ';
        }
        display += '\n';
    }
    display += '  a b c d e f g h';
    return display;
};

const AsciiChessBoard = ({ moves, interval = 1000 }) => {
    const [chess] = useState(new Chess());
    const [boardAscii, setBoardAscii] = useState(generateAsciiBoard(chess.board()));
    const [currentMove, setCurrentMove] = useState(0);

    useEffect(() => {
        if (currentMove >= moves.length) return;

        const timer = setTimeout(() => {
            chess.move(moves[currentMove]);
            setBoardAscii(generateAsciiBoard(chess.board()));
            setCurrentMove(currentMove + 1);
        }, interval);

        return () => clearTimeout(timer);
    }, [currentMove, moves, chess, interval]);

    return (
        <pre style={{
            backgroundColor: 'black',
            color: 'limegreen',
            padding: '1rem',
            fontFamily: 'monospace',
            fontSize: '16px',
            whiteSpace: 'pre',
            lineHeight: '1.4',
            maxWidth: 'fit-content'
        }}>
            {boardAscii}
        </pre>
    );
};

export default AsciiChessBoard;