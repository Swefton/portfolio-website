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

const generateBoardGrid = (board) => {
  const grid = [];
  for (let i = 7; i >= 0; i--) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      const square = board[i][j];
      if (square) {
        const key = square.color === 'w' ? square.type.toUpperCase() : square.type.toLowerCase();
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
                setBoardGrid(generateBoardGrid(viewBoard.current.board()));
            })
    }, []);
    
    // Set if board is currently animating the game or not
    const togglePlayPause = useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    function makeMove() {
        if (currentMove >= gameHistory.length) return;

        viewBoard.current.move(gameHistory[currentMove]);
        setCurrentMove(prev => prev + 1);
        setBoardGrid(generateBoardGrid(viewBoard.current.board()));
    }

    const resetGame = useCallback(() => {
        setCurrentMove(0);
        setIsPlaying(true);
    }, []);

    // TODO : adapt render board code
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
        <div ref={containerRef} style={{ color: "white" }}>

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

            <pre>
                {Object.entries(playBoard.current.getHeaders()).map(([key, value]) => (
                    <div key={key}>{key}: {value}</div>
                ))}
            </pre>

            {renderedBoard}
        </div>
    );
};

export default AsciiChessBoard;
