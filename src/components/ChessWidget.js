// AsciiChessBoard.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import styles from './AsciiChessBoard.module.css';

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

const AsciiChessBoard = ({ moves, interval = 1000 }) => {
    const [chess] = useState(new Chess());
    const [boardGrid, setBoardGrid] = useState(generateBoardGrid(chess.board()));
    const [currentMove, setCurrentMove] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [gameHistory, setGameHistory] = useState([]);
    const timerRef = useRef(null);

    useEffect(() => {
        const initialChess = new Chess();
        setGameHistory([{ board: generateBoardGrid(initialChess.board()), fen: initialChess.fen(), move: null, moveNumber: 0 }]);
    }, []);

    useEffect(() => {
        if (!isPlaying || currentMove >= moves.length) return;

        timerRef.current = setTimeout(() => {
            makeMove(currentMove);
        }, interval);

        return () => clearTimeout(timerRef.current);
    }, [currentMove, moves, isPlaying, interval]);

    const makeMove = (moveIndex) => {
        if (moveIndex >= moves.length) return;

        const newChess = new Chess();
        for (let i = 0; i <= moveIndex; i++) {
            newChess.move(moves[i]);
        }

        const newBoardState = {
            board: generateBoardGrid(newChess.board()),
            fen: newChess.fen(),
            move: moves[moveIndex],
            moveNumber: moveIndex + 1
        };

        setGameHistory(prev => {
            const newHistory = [...prev];
            newHistory[moveIndex + 1] = newBoardState;
            return newHistory;
        });

        setBoardGrid(newBoardState.board);
        setCurrentMove(moveIndex + 1);
    };

    const goToMove = (moveIndex) => {
        clearTimeout(timerRef.current);
        if (moveIndex === 0) {
            const initialChess = new Chess();
            setBoardGrid(generateBoardGrid(initialChess.board()));
            setCurrentMove(0);
        } else if (moveIndex <= moves.length && gameHistory[moveIndex]) {
            setBoardGrid(gameHistory[moveIndex].board);
            setCurrentMove(moveIndex);
        }
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const nextMove = () => {
        if (currentMove < moves.length) {
            clearTimeout(timerRef.current);
            setIsPlaying(false);
            makeMove(currentMove);
        }
    };

    const previousMove = () => {
        if (currentMove > 0) {
            clearTimeout(timerRef.current);
            setIsPlaying(false);
            goToMove(currentMove - 1);
        }
    };

    const resetGame = () => {
        clearTimeout(timerRef.current);
        setCurrentMove(0);
        setIsPlaying(true);
        const initialChess = new Chess();
        setBoardGrid(generateBoardGrid(initialChess.board()));
    };

    return (
        <div className={styles.container}>
            <div className={styles.carousel}>
                <p>In my free time I like playing Chess. This was the best game I've played.</p>
            </div>
            <div className={styles.boardWrapper}>
                <div className={styles.columnHeaders}>
                    <div className={styles.rankSpacer}></div>
                    {'abcdefgh'.split('').map(file => (
                        <div key={file} className={styles.fileHeader}>{file}</div>
                    ))}
                </div>
                {boardGrid.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        <div className={styles.rank}>{row.rank}</div>
                        {row.squares.map((piece, colIndex) => {
                            const isLight = (rowIndex + colIndex) % 2 === 0;
                            return (
                                <div
                                    key={colIndex}
                                    className={`${styles.square} ${isLight ? styles.lightSquare : styles.darkSquare}`}
                                >
                                    {piece === '·' ? '' : piece}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className={styles.controls}>
                <button onClick={resetGame} className={styles.button}>Reset</button>
                <button onClick={previousMove} disabled={currentMove === 0} className={styles.button}>Prev</button>
                <button onClick={togglePlayPause} className={styles.button}>{isPlaying ? 'Pause' : 'Play'}</button>
                <button onClick={nextMove} disabled={currentMove >= moves.length} className={styles.button}>Next</button>
            </div>

            <div className={styles.movesList}>
                <div className={styles.movesHeader}>Moves ({currentMove}/{moves.length}):</div>
                <div className={styles.movesGrid}>
                    <button onClick={() => goToMove(0)} className={currentMove === 0 ? styles.activeMoveButton : styles.moveButton}>Start</button>
                    {moves.map((move, index) => (
                        <button
                            key={index}
                            onClick={() => goToMove(index + 1)}
                            className={currentMove === index + 1 ? styles.activeMoveButton : styles.moveButton}
                        >
                            {Math.floor(index / 2) + 1}.{index % 2 === 0 ? '' : '..'} {move}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.currentMoveInfo}>
                {currentMove === 0 ? 'Starting position' : `Move ${currentMove}: ${moves[currentMove - 1]}`}
            </div>
        </div>
    );
};

export default AsciiChessBoard;
