'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Chess } from 'chess.js';
import { useAnimationTick } from '../../app/page'; 
import styles from './ChessWidget.module.css';

const pieceUnicode = {
  P: 'P', R: 'R', N: 'N', B: 'B', Q: 'Q', K: 'K',
  p: 'O', r: 'T', n: 'M', b: 'V', q: 'W', k: 'L',
  '.' : '·'
};

const generateBoardGrid = (board, whiteView = true) => {
  const grid = [];

  const rankRange = whiteView
    ? [...Array(8).keys()].reverse()
    : [...Array(8).keys()];

  const fileRange = whiteView
    ? [...Array(8).keys()]
    : [...Array(8).keys()].reverse();

  for (const i of rankRange) {
    const row = [];
    for (const j of fileRange) {
      const square = board[i][j];
      if (square) {
        const key = square.color === 'w'
          ? square.type.toUpperCase()
          : square.type.toLowerCase();
        row.push(pieceUnicode[key]);
      } else {
        row.push(pieceUnicode['.']);
      }
    }
    grid.push({ rank: i + 1, squares: row });
  }
  return grid;
};

const AsciiChessBoard = () => {
    const containerRef = useRef();
    const [sizeMode, setSizeMode] = useState('full');
    const [boardSize, setBoardSize] = useState({ squareSize: 32, showLabels: true });
    const [boardGrid, setBoardGrid] = useState([]);
    const lastMoveTimeRef = useRef(0);

    const playBoard = useRef(new Chess());
    const viewBoard = useRef(new Chess());
    const [isWhiteView, setIsWhiteView] = useState(true);
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
                const headers = playBoard.current.getHeaders();
                setIsWhiteView(headers.White?.toLowerCase() === 'sweftonxd');
                setGameHistory(playBoard.current.history());
                setBoardGrid(generateBoardGrid(viewBoard.current.board(), headers.White?.toLowerCase() === 'sweftonxd'));
            });
    }, []);

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

    // Set if board is currently animating the game or not
    const togglePlayPause = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    const resetGame = useCallback(() => {
        setCurrentMove(0);
        setIsPlaying(true);
    }, []);

    function makeMove() {
        if (currentMove >= gameHistory.length) return;

        viewBoard.current.move(gameHistory[currentMove]);
        setCurrentMove(prev => prev + 1);
        setBoardGrid(generateBoardGrid(viewBoard.current.board(), isWhiteView));
    }

    // TODO : adapt render board code
    const renderedBoard = useMemo(() => {
        const { squareSize, showLabels } = boardSize;
        const labelSize = showLabels ? 20 : 0;
        const files = isWhiteView ? 'abcdefgh' : 'hgfedcba';
        
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
                        {files.split('').map(file => (
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
        <div ref={containerRef} style={{ color: "white", width: "100%", height: "100%" }}>

            <div>
                <strong>Current move index:</strong> {currentMove}
            </div>

            <div>
                <strong>Total moves:</strong> {gameHistory.length}
            </div>

            <div>
                <strong>Is playing:</strong> {String(isPlaying)}
            </div>

            <button onClick={makeMove}>
                Make move
            </button>

            {
                !isWhiteView ? (
                    <>
                        <p>{playBoard.current.getHeaders()['White']}</p>
                        <p>{playBoard.current.getHeaders()['WhiteElo']}</p>
                    </>
                ) :
                    (
                        <>
                            <p>{playBoard.current.getHeaders()['Black']}</p>
                            <p>{playBoard.current.getHeaders()['BlackElo']}</p>
                        </>
                    )
            }

            {renderedBoard}
            
            {
                isWhiteView ? (
                    <>
                        <p>{playBoard.current.getHeaders()['White']}</p>
                        <p>{playBoard.current.getHeaders()['WhiteElo']}</p>
                    </>
                ) :
                    (
                        <>
                            <p>{playBoard.current.getHeaders()['Black']}</p>
                            <p>{playBoard.current.getHeaders()['BlackElo']}</p>
                        </>
                    )
            }

        </div>
    );
};

export default AsciiChessBoard;
