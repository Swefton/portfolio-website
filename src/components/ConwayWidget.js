import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useAnimationTick } from '../app/page'; // Import the hook

// Memoized cell component to prevent unnecessary re-renders
const Cell = ({ isAlive, onClick, isLight }) => (
  <span
    onClick={onClick}
    style={{
      width: '8px',
      height: '8px',
      cursor: 'pointer',
      color: isAlive ? '#00ff00' : '#003300',
      backgroundColor: isAlive ? '#00ff0020' : 'transparent',
      border: '1px solid #002200',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '6px'
    }}
  >
    {isAlive ? '█' : '·'}
  </span>
);

const ConwayWidget = () => {
  const [grid, setGrid] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(750);
  const [generation, setGeneration] = useState(0);
  const containerRef = useRef();
  const lastUpdateRef = useRef(0);
  const [dimensions, setDimensions] = useState({ rows: 20, cols: 30 });
  
  const { tick } = useAnimationTick();

  // Memoized empty grid creator
  const createEmptyGrid = useCallback(() => {
    return Array(dimensions.rows).fill().map(() => Array(dimensions.cols).fill(0));
  }, [dimensions]);

  // Memoized random pattern generator
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

  // Optimized neighbor counting with bounds checking
  const countNeighbors = useCallback((grid, x, y) => {
    // Safety check - ensure grid exists and has proper dimensions
    if (!grid || !grid[x] || grid.length === 0) return 0;
    
    let count = 0;
    const maxRow = grid.length - 1;
    const maxCol = grid[0] ? grid[0].length - 1 : 0;
    
    for (let i = Math.max(0, x - 1); i <= Math.min(maxRow, x + 1); i++) {
      for (let j = Math.max(0, y - 1); j <= Math.min(maxCol, y + 1); j++) {
        if (i === x && j === y) continue;
        if (grid[i] && typeof grid[i][j] !== 'undefined') {
          count += grid[i][j];
        }
      }
    }
    return count;
  }, []);

  // Optimized next generation calculation
  const nextGeneration = useCallback(() => {
    setGrid(prevGrid => {
      // Safety check - ensure we have a valid grid before processing
      if (!prevGrid || prevGrid.length === 0 || !prevGrid[0]) {
        return prevGrid;
      }
      
      const rows = prevGrid.length;
      const cols = prevGrid[0].length;
      const newGrid = Array(rows).fill().map(() => Array(cols).fill(0));
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const neighbors = countNeighbors(prevGrid, i, j);
          const isAlive = prevGrid[i][j] === 1;
          
          // Conway's rules optimized
          if (isAlive) {
            newGrid[i][j] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
          } else {
            newGrid[i][j] = neighbors === 3 ? 1 : 0;
          }
        }
      }
      return newGrid;
    });
    setGeneration(prev => prev + 1);
  }, [countNeighbors]);

  // Game loop using global animation tick
  useEffect(() => {
    if (!isPlaying || grid.length === 0) return;
    
    const now = performance.now();
    if (now - lastUpdateRef.current < speed) {
      return;
    }
    
    lastUpdateRef.current = now;
    nextGeneration();
  }, [tick, isPlaying, speed, nextGeneration, grid.length]);

  // Handle resize with debouncing
  useEffect(() => {
    let resizeTimeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const cellSize = 8;
          const newCols = Math.floor((rect.width - 20) / cellSize);
          const newRows = Math.floor((rect.height - 60) / cellSize);
          
          setDimensions({ 
            rows: Math.max(10, newRows), 
            cols: Math.max(15, newCols) 
          });
        }
      }, 100); // 100ms debounce
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Initialize with random pattern when dimensions change
  useEffect(() => {
    if (dimensions.rows > 0 && dimensions.cols > 0) {
      randomizeGrid();
    }
  }, [dimensions, randomizeGrid]);

  // Optimized cell click handler
  const cellClick = useCallback((row, col) => {
    setGrid(prevGrid => {
      if (!prevGrid || !prevGrid[row]) return prevGrid;
      
      const newGrid = prevGrid.map((r, i) => 
        i === row ? r.map((c, j) => j === col ? (c ? 0 : 1) : c) : [...r]
      );
      return newGrid;
    });
  }, []);

  // Memoized grid rendering to prevent unnecessary re-renders
  const renderedGrid = useMemo(() => {
    if (grid.length === 0) return null;
    
    return grid.map((row, i) => (
      <div key={i} style={{ display: 'flex', lineHeight: '8px', height: '8px' }}>
        {row.map((cell, j) => {
          const isLight = (i + j) % 2 === 0;
          return (
            <Cell
              key={j}
              isAlive={cell === 1}
              onClick={() => cellClick(i, j)}
              isLight={isLight}
            />
          );
        })}
      </div>
    ));
  }, [grid, cellClick]);

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
        {renderedGrid}
      </div>

      {/* Controls */}
      <div style={{ 
        padding: '8px 10px',
        fontSize: '9px'
      }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
          <button 
            onClick={() => {
              setGeneration(0); 
              randomizeGrid();
            }}
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
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              background: '#001100',
              border: '1px solid #00ff00',
              color: '#00ff00',
              padding: '4px 8px',
              fontSize: '9px',
              cursor: 'pointer',
              marginLeft: '8px'
            }}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConwayWidget;