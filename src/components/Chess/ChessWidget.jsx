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

const LineGraph = ({ data, width = 400, height = 200 }) => {
    // Define margins for labels and axis
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const points = data.map(d => ({
        x: d.end_time,
        y: d.rating
    }));

    const minX = Math.min(...points.map(p => p.x));
    const maxX = Math.max(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y));
    const maxY = Math.max(...points.map(p => p.y));

    // Scale functions that map data to chart coordinates
    const scaleX = x =>
        margin.left + ((x - minX) / (maxX - minX || 1)) * chartWidth;

    const scaleY = y =>
        margin.top + chartHeight - ((y - minY) / (maxY - minY || 1)) * chartHeight;

    // Generate X-axis ticks
    const xTicks = [];
    let current = new Date(minX * 1000);
    let end = new Date(maxX * 1000);

    while (current <= end) {
        xTicks.push({
            timestamp: scaleX(current.getTime() / 1000),
            label: current.toLocaleString('default', { month: 'short' }) + " '" + 
                   current.toLocaleString('default', { year: '2-digit' })
        });
        current.setMonth(current.getMonth() + 2);
    }

    const MIN_LABEL_PX = 50;
    const maxTicks = Math.floor(chartWidth / MIN_LABEL_PX) || 1;
    const skip = Math.ceil(xTicks.length / maxTicks);

    // Generate Y-axis ticks (5 ticks total)
    const yTicks = [];
    const numYTicks = 5;
    const yRange = maxY - minY;
    const yStep = yRange / (numYTicks - 1);

    for (let i = 0; i < numYTicks; i++) {
        const value = minY + (yStep * i);
        yTicks.push({
            value: value,
            label: value.toFixed(0)
        });
    }

    const polylinePoints = points
        .map(p => `${scaleX(p.x)},${scaleY(p.y)}`)
        .join(" ");

    return (
        <svg width={width} height={height}>
            {/* X-axis */}
            <line 
                x1={margin.left} 
                y1={height - margin.bottom} 
                x2={width - margin.right} 
                y2={height - margin.bottom} 
                stroke="white" 
                strokeWidth="2"
            />
            
            {/* Y-axis */}
            <line 
                x1={margin.left} 
                y1={margin.top} 
                x2={margin.left} 
                y2={height - margin.bottom} 
                stroke="white" 
                strokeWidth="2"
            />

            {/* Data line */}
            <polyline
                points={polylinePoints}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* X-axis ticks and labels */}
            {xTicks.map((tick, i) => {
                if (i % skip !== 0) return null;
                const x = tick.timestamp;
                return (
                    <g key={tick.timestamp}>
                        <line
                            x1={x}
                            y1={height - margin.bottom}
                            x2={x}
                            y2={height - margin.bottom + 6}
                            stroke="white"
                            strokeWidth="1"
                        />
                        <text
                            x={x}
                            y={height - margin.bottom + 20}
                            fill="white"
                            fontSize="12"
                            textAnchor="middle"
                        >
                            {tick.label}
                        </text>
                    </g>
                );
            })}

            {/* Y-axis ticks and labels */}
            {yTicks.map(tick => {
                const y = scaleY(tick.value);
                return (
                    <g key={tick.value}>
                        <line
                            x1={margin.left - 6}
                            y1={y}
                            x2={margin.left}
                            y2={y}
                            stroke="white"
                            strokeWidth="1"
                        />
                        <text
                            x={margin.left - 10}
                            y={y + 4}
                            fill="white"
                            fontSize="12"
                            textAnchor="end"
                        >
                            {tick.label}
                        </text>
                    </g>
                );
            })}
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

    const containerRef = useRef();
    const [sizeMode, setSizeMode] = useState('full');
    const [boardSize, setBoardSize] = useState({ squareSize: 32, showLabels: true });
        const [boardGrid, setBoardGrid] = useState(() => 
        generateBoardGrid(viewBoard.current.board(), true)
    );
    const lastMoveTimeRef = useRef(0);
    const [graphSize, setGraphSize] = useState({ width: 400, height: 200 });

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
    const movesHeight = 40;
    const graphHeight = 200;
    const playerInfoHeight = 80;

    if (width < 140 || height < 140) {
        setSizeMode('hidden');
        setBoardSize({ squareSize: 16, showLabels: false });
    } else if (availableWidth < 160 || availableHeight < 160) {
        setSizeMode('minimal');
        const maxSquareSize = Math.floor(Math.min(availableWidth, availableHeight - 20) / 8);
        setBoardSize({ 
            squareSize: Math.max(12, Math.min(20, maxSquareSize)), 
            showLabels: false 
        });
    } else if (availableWidth < 240 || availableHeight < textHeight + 200 + controlsHeight + graphHeight + playerInfoHeight) {
        setSizeMode('compact');
        // Keep the original calculation - don't subtract graph/player heights
        const maxSquareSize = Math.floor(Math.min(availableWidth - 40, availableHeight - textHeight - controlsHeight - 20) / 10);
        setBoardSize({ 
            squareSize: Math.max(20, Math.min(28, maxSquareSize)), 
            showLabels: true 
        });
    } else {
        setSizeMode('full');
        // Keep the original calculation - don't subtract graph/player heights
        const maxSquareSize = Math.floor(Math.min(availableWidth - 40, availableHeight - textHeight - controlsHeight - movesHeight - 40) / 10);
        setBoardSize({ 
            squareSize: Math.max(24, Math.min(32, maxSquareSize)), 
            showLabels: true 
        });
    }

    const graphWidth = Math.floor(width * 0.9);

    setGraphSize({
        width: graphWidth,
        height: 0.25 * height
    });
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

    function resetGame() {
        setCurrentMove(0);
        setIsPlaying(true);
        viewBoard.current.reset();
        setBoardGrid(generateBoardGrid(viewBoard.current.board(), isWhiteView));
    }

    function makeMove() {
        if (currentMove >= moveList.length) return;

        viewBoard.current.move(moveList[currentMove]);
        setCurrentMove(prev => prev + 1);
        setBoardGrid(generateBoardGrid(viewBoard.current.board(), isWhiteView));
    }

    function moveBack() {
        if (currentMove <= 0) return;
        viewBoard.current.undo();
        setCurrentMove(prev => prev - 1);
        setBoardGrid(generateBoardGrid(viewBoard.current.board(), isWhiteView));
    }

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
        <div ref={containerRef} className={`${styles.container} ${styles[sizeMode]}`}>
            <div className={styles.blurb}>
                <p>In my free time I like playing chess. This is the last game I played on {new Date(accountHistory[accountHistory.length - 1].end_time*1000).toLocaleDateString(
                    "en-US",
                    {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                    }
                )}</p>
            </div>
            <div className={styles.boardcontainer}>
                <div>
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
                </div>

                {renderedBoard}

                <div>
                {
                    isWhiteView ? (
                        <>
                            <p>{playBoard.current.getHeaders()['White']} (me)</p>
                            <p>{playBoard.current.getHeaders()['WhiteElo']}</p>
                        </>
                    ) :
                        (
                            <>
                                <p>{playBoard.current.getHeaders()['Black']} (me)</p>
                                <p>{playBoard.current.getHeaders()['BlackElo']}</p>
                            </>
                        )
                }
                </div>
            </div>

            <div className={styles.controls}>
                <button onClick={moveBack} className={styles.button}>
                    Back
                </button>
                <button onClick={makeMove} className={styles.button}>
                    Forward
                </button>
                <button onClick={resetGame} className={styles.button}>
                    Reset
                </button>
            </div>


            { sizeMode == "full" &&
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                    <div style={{ textAlign: "center" }}>
                        <p>Elo over last year of play</p>
                        <LineGraph data={accountHistory} 
                            width={graphSize.width}
                            height={graphSize.height}
                        />
                    </div>
                </div>
            }
        </div>
    );
};

export default AsciiChessBoard;
