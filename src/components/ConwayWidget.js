import { useState, useEffect, useRef, useCallback } from 'react';

const ConwayWidget = () => {
  const [grid, setGrid] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(200);
  const [generation, setGeneration] = useState(0);
  const intervalRef = useRef();
  const containerRef = useRef();

  const [dimensions, setDimensions] = useState({ rows: 20, cols: 30 });

  // Initialize empty grid
  const createEmptyGrid = useCallback(() => {
    return Array(dimensions.rows).fill().map(() => Array(dimensions.cols).fill(0));
  }, [dimensions]);

  // Random pattern generator
  const randomizeGrid = useCallback(() => {
    const newGrid = createEmptyGrid();
    for (let i = 0; i < dimensions.rows; i++) {
      for (let j = 0; j < dimensions.cols; j++) {
        newGrid[i][j] = Math.random() > 0.7 ? 1 : 0;
      }
    }
    setGrid(newGrid);
    setGeneration(0);
  }, [createEmptyGrid, dimensions]);

  // Count living neighbors
  const countNeighbors = (grid, x, y) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newX = x + i;
        const newY = y + j;
        if (newX >= 0 && newX < dimensions.rows && newY >= 0 && newY < dimensions.cols) {
          count += grid[newX][newY];
        }
      }
    }
    return count;
  };

  // Next generation calculation
  const nextGeneration = useCallback(() => {
    setGrid(prevGrid => {
      const newGrid = createEmptyGrid();
      for (let i = 0; i < dimensions.rows; i++) {
        for (let j = 0; j < dimensions.cols; j++) {
          const neighbors = countNeighbors(prevGrid, i, j);
          if (prevGrid[i][j] === 1) {
            // Cell is alive
            newGrid[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
          } else {
            // Cell is dead
            newGrid[i][j] = neighbors === 3 ? 1 : 0;
          }
        }
      }
      return newGrid;
    });
    setGeneration(prev => prev + 1);
  }, [createEmptyGrid, dimensions]);

  // Game loop
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(nextGeneration, speed);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, nextGeneration]);

  // Initialize with random pattern and handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const cellSize = 8;
        const newCols = Math.floor((rect.width - 20) / cellSize);
        const newRows = Math.floor((rect.height - 60) / cellSize);
        
        setDimensions({ rows: Math.max(10, newRows), cols: Math.max(15, newCols) });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize with random pattern when dimensions change
  useEffect(() => {
    if (dimensions.rows > 0 && dimensions.cols > 0) {
      randomizeGrid();
    }
  }, [dimensions, randomizeGrid]);

  const cellClick = (row, col) => {
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = newGrid[row][col] ? 0 : 1;
      return newGrid;
    });
  };

  return (
    <div 
      ref={containerRef}
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0a0a0a',
        fontFamily: 'Monaco, "Lucida Console", monospace',
        fontSize: '10px',
        color: '#00ff00',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '8px 10px',
        fontSize: '11px'
      }}>
        <span>Conway's Life</span>
        <span>Gen: {generation}</span>
      </div>

      {/* Game Grid */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 10px'
      }}>
        {grid.map((row, i) => (
          <div key={i} style={{ display: 'flex', lineHeight: '8px', height: '8px' }}>
            {row.map((cell, j) => (
              <span
                key={j}
                onClick={() => cellClick(i, j)}
                style={{
                  width: '8px',
                  height: '8px',
                  cursor: 'pointer',
                  color: cell ? '#00ff00' : '#003300',
                  backgroundColor: cell ? '#00ff0020' : 'transparent',
                  border: '1px solid #002200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '6px'
                }}
              >
                {cell ? '█' : '·'}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ 
        padding: '8px 10px',
        fontSize: '9px'
      }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            onClick={() => {setGeneration(0); randomizeGrid();}}
            style={{
              background: '#001100',
              border: '1px solid #00ff00',
              color: '#00ff00',
              padding: '4px 8px',
              fontSize: '9px',
              cursor: 'pointer'
            }}
          >
            Random
          </button>
          
          <span style={{ marginLeft: '8px' }}>Speed:</span>
          <input 
            type="range"
            min="50"
            max="500"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            style={{
              flex: 1,
              height: '12px',
              background: '#002200',
              outline: 'none'
            }}
          />
          <span>{speed}ms</span>
        </div>
      </div>
    </div>
  );
};

export default ConwayWidget;