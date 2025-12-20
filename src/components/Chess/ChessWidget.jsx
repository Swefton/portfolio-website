'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Chess } from 'chess.js';
import { useAnimationTick } from '../../app/page'; 
import styles from './ChessWidget.module.css';

const pieceUnicode = {
    p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
    P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔',
    '.': '·'
};

const generateBoardGrid = (board) => {
    const grid = [];
    for (let i = 7; i >= 0; i--) {
        const row = [];
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j];
            row.push(piece ? pieceUnicode[piece.color === 'w' ? piece.type.toUpperCase() : piece.type] : pieceUnicode['.']);
        }
        grid.push({ rank: i + 1, squares: row });
    }
    return grid;
};

const AsciiChessBoard = () => {
    const containerRef = useRef();
    const [sizeMode, setSizeMode] = useState('full');
    const [boardSize, setBoardSize] = useState({ squareSize: 32, showLabels: true });
    const [boardGrid, setBoardGrid] = useState();
    const lastMoveTimeRef = useRef(0);

    const playBoard = useRef(new Chess());
    const viewBoard = useRef(new Chess());
    const [currentMove, setCurrentMove] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [gameHistory, setGameHistory] = useState([]);
    
    const { tick } = useAnimationTick();

    // Initialize the chess boards with API call
    useEffect(() => {
        fetch("https://api.chess.com/pub/player/sweftonxd/games/live/180/0")
            .then(r => r.json())
            .then(data => {
                const pgn = data.games[data.games.length - 1].pgn;
                playBoard.current.loadPgn(pgn);
                setGameHistory(playBoard.current.history());
            })
    }, []);


};

export default AsciiChessBoard;
