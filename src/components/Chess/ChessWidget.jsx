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
    const containerRef = useRef();
    const [sizeMode, setSizeMode] = useState('full');
    const [boardSize, setBoardSize] = useState({ squareSize: 32, showLabels: true });
    const [chess] = useState(new Chess());
    const [boardGrid, setBoardGrid] = useState(() => generateBoardGrid(chess.board()));
    const [currentMove, setCurrentMove] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [gameHistory, setGameHistory] = useState([]);
    const lastMoveTimeRef = useRef(0);
    
    const { tick } = useAnimationTick();

    // Enhanced responsive size detection with better calculations
    useEffect(() => {
        const updateSizeMode = () => {
            if (!containerRef.current) return;
            
            const { width, height } = containerRef.current.getBoundingClientRect();
            
            // Account for container padding and borders
            const containerPadding = 16; // 0.5rem * 2 sides
            const boardPadding = 16; // Board wrapper padding
            const availableWidth = width - containerPadding - boardPadding;
            const availableHeight = height - containerPadding;
            
            const controlsHeight = 40;
            const textHeight = 50;
            const movesHeight = 120;
            
            if (width < 140 || height < 140) {
                setSizeMode('hidden');
                setBoardSize({ squareSize: 16, showLabels: false });
            } else if (availableWidth < 160 || availableHeight < 160) {
                setSizeMode('minimal');
                // Calculate square size that fits in available space
                const maxSquareSize = Math.floor(Math.min(availableWidth, availableHeight - 20) / 8);
                setBoardSize({ 
                    squareSize: Math.max(12, Math.min(20, maxSquareSize)), 
                    showLabels: false 
                });
            } else if (availableWidth < 240 || availableHeight < textHeight + 200 + controlsHeight) {
                setSizeMode('compact');
                // Calculate optimal size for compact mode
                const maxSquareSize = Math.floor(Math.min(availableWidth - 40, availableHeight - textHeight - controlsHeight - 20) / 10); // 8 squares + 2 for labels
                setBoardSize({ 
                    squareSize: Math.max(20, Math.min(28, maxSquareSize)), 
                    showLabels: true 
                });
            } else {
                setSizeMode('full');
                // Calculate size leaving room for moves list
                const maxSquareSize = Math.floor(Math.min(availableWidth - 40, availableHeight - textHeight - controlsHeight - movesHeight - 40) / 10);
                setBoardSize({ 
                    squareSize: Math.max(24, Math.min(36, maxSquareSize)), 
                    showLabels: true 
                });
            }
        };

        updateSizeMode();
        
        const resizeObserver = new ResizeObserver(updateSizeMode);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        
        return () => resizeObserver.disconnect();
    }, []);

    // Initialize game history
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

    // Animation logic
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

    // Dynamic board rendering with calculated sizes
    const renderedBoard = useMemo(() => {
        const { squareSize, showLabels } = boardSize;
        const labelSize = showLabels ? 20 : 0;
        
        return (
            <div 
                className={styles.boardWrapper}
                style={{
                    padding: sizeMode === 'minimal' ? '4px' : '8px',
                }}
            >
                {/* Column headers */}
                {showLabels && (
                    <div className={styles.columnHeaders}>
                        <div style={{ width: `${labelSize}px` }}></div>
                        {'abcdefgh'.split('').map(file => (
                            <div 
                                key={file} 
                                className={styles.fileHeader}
                                style={{ width: `${squareSize}px`, fontSize: `${Math.max(10, squareSize * 0.35)}px` }}
                            >
                                {file}
                            </div>
                        ))}
                    </div>
                )}
                
                {boardGrid.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {/* Rank numbers */}
                        {showLabels && (
                            <div 
                                className={styles.rank}
                                style={{ 
                                    width: `${labelSize}px`, 
                                    fontSize: `${Math.max(10, squareSize * 0.35)}px` 
                                }}
                            >
                                {row.rank}
                            </div>
                        )}
                        
                        {row.squares.map((piece, colIndex) => {
                            const isLight = (rowIndex + colIndex) % 2 === 0;
                            return (
                                <div
                                    key={colIndex}
                                    className={`${styles.square} ${isLight ? styles.lightSquare : styles.darkSquare}`}
                                    style={{
                                        width: `${squareSize}px`,
                                        height: `${squareSize}px`,
                                        fontSize: `${Math.max(10, squareSize * 0.6)}px`
                                    }}
                                >
                                    {piece === '·' ? '' : piece}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    }, [boardGrid, sizeMode, boardSize]);

    return (
        <div ref={containerRef} className={`${styles.container} ${styles[sizeMode]}`}>
            {/* Hidden message */}
            {sizeMode === 'hidden' && (
                <div className={styles.hiddenMessage}>
                    Chess widget hidden - container too small
                </div>
            )}

            {/* Main content */}
            {sizeMode !== 'hidden' && (
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: sizeMode === 'minimal' ? '0.25rem' : '1rem', 
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: sizeMode === 'minimal' ? 'center' : 'flex-start'
                }}>
                    {/* Carousel text - hidden for minimal mode */}
                    {sizeMode !== 'minimal' && (
                        <div className={styles.carousel}>
                            {/* https://github.com/joshwalters/open-chess-font */}
                            <p>t M v W l V m T</p>
                            <p>O o O o O o O o</p>
                            <p>z x z x z x z x</p>
                            <p>x z x z x z x z</p>
                            <p>z x z x z x z x</p>
                            <p>x z x z x z x z</p>
                            <p>P p P p P p P p</p>
                            <p>r N b Q k B n R</p>

                        </div>
                    )}
                    
                    {renderedBoard}

                    {/* Controls - shown for compact and full modes */}
                    {(sizeMode === 'compact' || sizeMode === 'full') && (
                        <div className={styles.controls}>
                            <button onClick={resetGame} className={styles.button}>Reset</button>
                            <button onClick={togglePlayPause} className={styles.button}>
                                {isPlaying ? 'Pause' : 'Play'}
                            </button>
                        </div>
                    )}

                    {/* Full mode content - TUI-style moves list */}
                    {sizeMode === 'full' && (
                        <>
                            <div className={styles.movesList}>
                                <div className={styles.movesHeader}>
                                    Game History ({currentMove}/{moves.length})
                                </div>
                                
                                {/* Starting position */}
                                <div 
                                    className={`${styles.moveEntry} ${currentMove === 0 ? styles.activeMoveEntry : ''}`}
                                    onClick={() => {
                                        setCurrentMove(0);
                                        const initialChess = new Chess();
                                        setBoardGrid(generateBoardGrid(initialChess.board()));
                                    }}
                                >
                                    <span className={styles.moveNumber}>--</span>
                                    <span className={styles.moveText}>Initial Position</span>
                                </div>

                                {/* Move entries */}
                                {moves.map((move, index) => {
                                    const moveNum = Math.floor(index / 2) + 1;
                                    const isWhite = index % 2 === 0;
                                    
                                    return (
                                        <div
                                            key={index}
                                            className={`${styles.moveEntry} ${currentMove === index + 1 ? styles.activeMoveEntry : ''}`}
                                            onClick={() => {
                                                if (gameHistory[index + 1]) {
                                                    setBoardGrid(gameHistory[index + 1].board);
                                                    setCurrentMove(index + 1);
                                                }
                                            }}
                                        >
                                            <span className={styles.moveNumber}>
                                                {isWhite ? `${moveNum}.` : `${moveNum}..`}
                                            </span>
                                            <span className={styles.moveText}>{move}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className={styles.currentMoveInfo}>
                                {currentMove === 0 
                                    ? '> Ready to start game' 
                                    : `> ${moves[currentMove - 1]} - Move ${currentMove} played`
                                }
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default AsciiChessBoard;
