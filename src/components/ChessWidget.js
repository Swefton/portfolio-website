'use client';

import { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';

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

    // Initialize game history with starting position
    useEffect(() => {
        const initialChess = new Chess();
        setGameHistory([{
            board: generateBoardGrid(initialChess.board()),
            fen: initialChess.fen(),
            move: null,
            moveNumber: 0
        }]);
    }, []);

    // Auto-play logic
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
        // Replay all moves up to the current index
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
            // Go to starting position
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
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            fontFamily: 'monospace',
            backgroundColor: 'black',
            color: 'limegreen',
            padding: '1rem',
            borderRadius: '8px',
            maxWidth: 'fit-content'
        }}>
            {/* Chess Board */}
            <div style={{
                display: 'inline-block',
                border: '2px solid #333',
                borderRadius: '4px',
                padding: '8px',
                backgroundColor: '#0a0a0a'
            }}>
                {/* Column headers */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '4px'
                }}>
                    <div style={{ width: '24px' }}></div>
                    {'abcdefgh'.split('').map(file => (
                        <div key={file} style={{
                            width: '32px',
                            textAlign: 'center',
                            fontSize: '12px',
                            color: '#666'
                        }}>
                            {file}
                        </div>
                    ))}
                </div>
                
                {/* Board rows */}
                {boardGrid.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Rank number */}
                        <div style={{
                            width: '24px',
                            textAlign: 'center',
                            fontSize: '12px',
                            color: '#666'
                        }}>
                            {row.rank}
                        </div>
                        {/* Squares */}
                        {row.squares.map((piece, colIndex) => {
                            const isLight = (rowIndex + colIndex) % 2 === 0;
                            return (
                                <div
                                    key={colIndex}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '20px',
                                        backgroundColor: isLight ? '#2a2a2a' : '#1a1a1a',
                                        border: '1px solid #333',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    {piece === '·' ? '' : piece}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                <button 
                    onClick={resetGame}
                    style={{
                        backgroundColor: '#333',
                        color: 'limegreen',
                        border: '1px solid limegreen',
                        borderRadius: '4px',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                        fontSize: '12px'
                    }}
                >
                    ⏮ Reset
                </button>
                <button 
                    onClick={previousMove}
                    disabled={currentMove === 0}
                    style={{
                        backgroundColor: currentMove === 0 ? '#222' : '#333',
                        color: currentMove === 0 ? '#666' : 'limegreen',
                        border: '1px solid limegreen',
                        borderRadius: '4px',
                        padding: '0.25rem 0.5rem',
                        cursor: currentMove === 0 ? 'not-allowed' : 'pointer',
                        fontFamily: 'monospace',
                        fontSize: '12px'
                    }}
                >
                    ◀ Prev
                </button>
                <button 
                    onClick={togglePlayPause}
                    style={{
                        backgroundColor: '#333',
                        color: 'limegreen',
                        border: '1px solid limegreen',
                        borderRadius: '4px',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                        fontSize: '12px'
                    }}
                >
                    {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
                <button 
                    onClick={nextMove}
                    disabled={currentMove >= moves.length}
                    style={{
                        backgroundColor: currentMove >= moves.length ? '#222' : '#333',
                        color: currentMove >= moves.length ? '#666' : 'limegreen',
                        border: '1px solid limegreen',
                        borderRadius: '4px',
                        padding: '0.25rem 0.5rem',
                        cursor: currentMove >= moves.length ? 'not-allowed' : 'pointer',
                        fontFamily: 'monospace',
                        fontSize: '12px'
                    }}
                >
                    Next ▶
                </button>
            </div>

            {/* Move List */}
            <div style={{
                maxHeight: '120px',
                overflowY: 'auto',
                border: '1px solid #333',
                borderRadius: '4px',
                padding: '0.5rem',
                backgroundColor: '#111'
            }}>
                <div style={{ 
                    fontSize: '12px', 
                    marginBottom: '0.5rem',
                    color: '#888'
                }}>
                    Moves ({currentMove}/{moves.length}):
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                    gap: '0.25rem'
                }}>
                    <button
                        onClick={() => goToMove(0)}
                        style={{
                            backgroundColor: currentMove === 0 ? 'limegreen' : '#333',
                            color: currentMove === 0 ? 'black' : 'limegreen',
                            border: '1px solid #555',
                            borderRadius: '3px',
                            padding: '0.2rem 0.3rem',
                            cursor: 'pointer',
                            fontFamily: 'monospace',
                            fontSize: '10px'
                        }}
                    >
                        Start
                    </button>
                    {moves.map((move, index) => (
                        <button
                            key={index}
                            onClick={() => goToMove(index + 1)}
                            style={{
                                backgroundColor: currentMove === index + 1 ? 'limegreen' : '#333',
                                color: currentMove === index + 1 ? 'black' : 'limegreen',
                                border: '1px solid #555',
                                borderRadius: '3px',
                                padding: '0.2rem 0.3rem',
                                cursor: 'pointer',
                                fontFamily: 'monospace',
                                fontSize: '10px'
                            }}
                        >
                            {Math.floor(index / 2) + 1}.{index % 2 === 0 ? '' : '..'} {move}
                        </button>
                    ))}
                </div>
            </div>

            {/* Current Move Info */}
            <div style={{
                fontSize: '12px',
                color: '#888',
                textAlign: 'center',
                borderTop: '1px solid #333',
                paddingTop: '0.5rem'
            }}>
                {currentMove === 0 ? 'Starting position' : 
                 `Move ${currentMove}: ${moves[currentMove - 1]}`}
            </div>
        </div>
    );
};

export default AsciiChessBoard;