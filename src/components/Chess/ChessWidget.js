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

const AsciiChessBoard = ({ moves, interval = 1000 }) => {
    // ALL HOOKS MUST BE DECLARED UNCONDITIONALLY AT THE TOP
    const containerRef = useRef();
    const [sizeMode, setSizeMode] = useState('full');
    const [chess] = useState(new Chess());
    const [boardGrid, setBoardGrid] = useState(() => generateBoardGrid(chess.board()));
    const [currentMove, setCurrentMove] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [gameHistory, setGameHistory] = useState([]);
    const lastMoveTimeRef = useRef(0);
    
    const { tick } = useAnimationTick();

    // Responsive size detection - ALWAYS runs
    useEffect(() => {
        const updateSizeMode = () => {
            if (!containerRef.current) return;
            
            const { width, height } = containerRef.current.getBoundingClientRect();
            
            // Progressive feature removal based on container size
            if (width < 200 || height < 150) {
                setSizeMode('hidden'); // Hide entirely for tiny containers
            } else if (width < 250 || height < 200) {
                setSizeMode('minimal'); // Board only, no controls
            } else if (width < 350 || height < 300) {
                setSizeMode('compact'); // Board + basic controls
            } else {
                setSizeMode('full'); // Full layout
            }
        };

        updateSizeMode();
        
        const resizeObserver = new ResizeObserver(updateSizeMode);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        
        return () => resizeObserver.disconnect();
    }, []);

    // Initialize game history - ALWAYS runs
    useEffect(() => {
        const initialChess = new Chess();
        setGameHistory([{ 
            board: generateBoardGrid(initialChess.board()), 
            fen: initialChess.fen(), 
            move: null, 
            moveNumber: 0 
        }]);
    }, []);

    const makeMove = useCallback((moveIndex) => {
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
    }, [moves]);

    // Animation logic - ALWAYS runs
    useEffect(() => {
        if (!isPlaying || currentMove >= moves.length) return;
        
        const now = performance.now();
        if (now - lastMoveTimeRef.current < interval) {
            return;
        }
        
        lastMoveTimeRef.current = now;
        makeMove(currentMove);
    }, [tick, isPlaying, currentMove, moves.length, interval, makeMove]);

    const togglePlayPause = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    const resetGame = useCallback(() => {
        setCurrentMove(0);
        setIsPlaying(true);
        const initialChess = new Chess();
        setBoardGrid(generateBoardGrid(initialChess.board()));
        lastMoveTimeRef.current = 0;
    }, []);

    // Responsive board rendering - using useMemo to avoid conditional hooks
    const renderedBoard = useMemo(() => {
        const squareClass = sizeMode === 'minimal' ? styles.tinySquare : styles.square;
        
        return (
            <div className={styles.boardWrapper}>
                {/* Column headers - hidden via CSS for minimal mode */}
                <div 
                    className={styles.columnHeaders}
                    style={{ display: sizeMode === 'minimal' ? 'none' : 'flex' }}
                >
                    <div className={styles.rankSpacer}></div>
                    {'abcdefgh'.split('').map(file => (
                        <div key={file} className={styles.fileHeader}>{file}</div>
                    ))}
                </div>
                
                {boardGrid.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {/* Rank numbers - hidden via CSS for minimal mode */}
                        <div 
                            className={styles.rank}
                            style={{ display: sizeMode === 'minimal' ? 'none' : 'flex' }}
                        >
                            {row.rank}
                        </div>
                        
                        {row.squares.map((piece, colIndex) => {
                            const isLight = (rowIndex + colIndex) % 2 === 0;
                            return (
                                <div
                                    key={colIndex}
                                    className={`${squareClass} ${isLight ? styles.lightSquare : styles.darkSquare}`}
                                >
                                    {piece === '·' ? '' : piece}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    }, [boardGrid, sizeMode]);

    // CRITICAL: Always render the same JSX structure, use conditional styling instead
    return (
        <div ref={containerRef} className={`${styles.container} ${styles[sizeMode]}`}>
            {/* Hidden message - conditionally visible via CSS */}
            <div 
                className={styles.hiddenMessage}
                style={{ display: sizeMode === 'hidden' ? 'flex' : 'none' }}
            >
                Chess widget hidden - container too small
            </div>

            {/* Main content - hidden when size mode is 'hidden' */}
            <div style={{ display: sizeMode === 'hidden' ? 'none' : 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                {/* Carousel text - hidden for minimal mode */}
                <div 
                    className={styles.carousel}
                    style={{ display: sizeMode === 'minimal' ? 'none' : 'block' }}
                >
                    <p>In my free time I like playing Chess. This was the best game I've played.</p>
                </div>
                
                {renderedBoard}

                {/* Controls - shown for compact and full modes */}
                <div 
                    className={styles.controls}
                    style={{ display: (sizeMode === 'compact' || sizeMode === 'full') ? 'flex' : 'none' }}
                >
                    <button onClick={resetGame} className={styles.button}>Reset</button>
                    <button onClick={togglePlayPause} className={styles.button}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                </div>

                {/* Full mode content - shown only for full mode */}
                <div style={{ display: sizeMode === 'full' ? 'flex' : 'none', flexDirection: 'column', flex: 1, gap: '1rem' }}>
                    <div className={styles.movesList}>
                        <div className={styles.movesHeader}>Moves ({currentMove}/{moves.length}):</div>
                        <div className={styles.movesGrid}>
                            <button 
                                onClick={() => {
                                    setCurrentMove(0);
                                    const initialChess = new Chess();
                                    setBoardGrid(generateBoardGrid(initialChess.board()));
                                }} 
                                className={currentMove === 0 ? styles.activeMoveButton : styles.moveButton}
                            >
                                Start
                            </button>
                            {moves.map((move, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (gameHistory[index + 1]) {
                                            setBoardGrid(gameHistory[index + 1].board);
                                            setCurrentMove(index + 1);
                                        }
                                    }}
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
            </div>
        </div>
    );
};

export default AsciiChessBoard;