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

const LineGraph = ({ data, width = 400, height = 200, padding = 50 }) => {
    const points = data
    .map(d => ({
        x: d.end_time,
        y: d.rating
    }));

    const minX = Math.min(...points.map(p => p.x));
    const maxX = Math.max(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y));
    const maxY = Math.max(...points.map(p => p.y));

    const scaleX = x =>
        padding + ((x - minX) / (maxX - minX || 1)) * (width - padding * 2);

    const scaleY = y =>
        height - padding - (0.1 + ((y - minY) * 0.8) / (maxY - minY || 1)) * (height - padding * 2);

    // Generate X-axis ticks
    const xTicks = [];
    let current = new Date(minX * 1000);
    let end = new Date(maxX * 1000);
    const last = new Date(end.setMonth(end.getMonth()+1));

    while (current <= last) {
        xTicks.push({
            timestamp: scaleX(current.getTime() / 1000),
            label: current.toLocaleString('default', { month: 'short' })
        });

        current.setMonth(current.getMonth() + 2);
    }

    // Generate Y-axis ticks
    const yTicks = [];

    const startY = minY; // your data min
    const endY = maxY;   // your data max
    const step = (endY - startY) / 5; // or any interval you want

    let currentY = startY;

    while (currentY < endY) {
        yTicks.push({
            value: scaleY(currentY),
            label: currentY.toFixed(0) // or format as needed
        });
        currentY += step;
    }

    // ensure last tick
    if (yTicks[yTicks.length - 1].value < endY) {
        yTicks.push({
            value: scaleY(endY),
            label: endY.toFixed(0)
        });
    }
    console.log(yTicks);

    const polylinePoints = points
        .map(p => `${scaleX(p.x)},${scaleY(p.y)}`)
        .join(" ");

    return (
        <svg width={width} height={height}>
            <line x1={0+padding} y1={height-padding} x2={scaleX(last/1000)} y2={height-padding} stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
            <line x1={0+padding} y1={height-padding} x2={0+padding} y2={0+padding} stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke"/>

            <polyline
                points={polylinePoints}
                fill="none"
                stroke="white"
                strokeWidth="1"
            />

            {xTicks.map(tick => (
                <g key={tick.timestamp}>
                    <line
                        x1={tick.timestamp}
                        y1={height-padding}
                        x2={tick.timestamp}
                        y2={height-padding + 8}
                        stroke="white"
                        strokeWidth="2"
                    />
                    <text
                        x={tick.timestamp}
                        y={height-padding + 18}
                        fill="white"
                        fontSize="12"
                        textAnchor="middle"
                    >
                        {tick.label}
                    </text>
                </g>
            ))}


            {
                yTicks.map(tick => (
                    <g key={tick.value}>
                        <line
                            x1={padding*3.5/4}
                            y1={tick.value*.95}
                            x2={padding}
                            y2={tick.value*.95}
                            stroke="white"
                            strokeWidth="2"
                        />
                        <text
                            x={padding/2}
                            y={tick.value}
                            fill="white"
                            fontSize="12"
                            textAnchor="middle"
                        >
                            {tick.label}
                        </text>
                    </g>
                ))
            }
        </svg>
    );
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
    const [moveList, setMoveList] = useState([]);
    const [accountHistory, setAccountHistory] = useState([
        { rating: 980, end_time: 1 },
        { rating: 990, end_time: 2 },
        { rating: 1002, end_time: 3 },
        { rating: 994, end_time: 4 },
        { rating: 1004, end_time: 5 },
        { rating: 1010, end_time: 6 }
    ]);


    const { tick } = useAnimationTick();

    // Initialize the chess boards with API call
    useEffect(() => {
        fetch("https://api.chess.com/pub/player/sweftonxd/games/live/180/0")
            .then(r => r.json())
            .then(data => {
                const myUsername = "sweftonxd";
                const currentDate = (Date.now() / 1000) - (365 * 24 * 60 * 60);
                const previousGames = data.games
                .filter(game => game.rated === true)
                .filter(game => game.end_time >= currentDate)
                .map(game => {
                    if (game.white.username.toLowerCase() === myUsername) {
                        return {
                            rating: game.white.rating,
                            end_time: game.end_time
                        };
                    }
                    if (game.black.username.toLowerCase() === myUsername) {
                        return {
                            rating: game.black.rating,
                            end_time: game.end_time
                        };
                    }
                    return null;
                })
                .filter(Boolean);

                setAccountHistory(previousGames);

                const pgn = data.games[data.games.length - 1].pgn;
                playBoard.current.loadPgn(pgn);
                const headers = playBoard.current.getHeaders();
                const isWhite = headers.White?.toLowerCase() === myUsername;
                setIsWhiteView(isWhite);
                setMoveList(playBoard.current.history());
                setBoardGrid(
                    generateBoardGrid(
                        viewBoard.current.board(),
                        isWhite
                    )
                );
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
        if (currentMove >= moveList.length) return;

        viewBoard.current.move(moveList[currentMove]);
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
                <strong>Total moves:</strong> {moveList.length}
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

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                    <p>Elo over last year of play</p>
                    <LineGraph data={accountHistory} />
                </div>
            </div>
        </div>
    );
};

export default AsciiChessBoard;
