import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Conway.module.css';

const ConwayWidget = () => {
  const [grid, setGrid] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(750);
  const [generation, setGeneration] = useState(0);
  const canvasRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ rows: 30, cols: 30 });
  const [cellSize, setCellSize] = useState(8);

  // Calculate optimal cell size based on container dimensions
  const calculateCellSize = useCallback(() => {
    const container = containerRef.current;
    if (!container) return 8;
    
    const containerRect = container.getBoundingClientRect();
    const availableWidth = containerRect.width - 40; // Account for padding
    const availableHeight = containerRect.height - 120; // Account for header and controls
    
    const maxCellWidth = Math.floor(availableWidth / dimensions.cols);
    const maxCellHeight = Math.floor(availableHeight / dimensions.rows);
    
    // Use the smaller dimension to ensure the grid fits in both directions
    const optimalSize = Math.min(maxCellWidth, maxCellHeight);
    
    // Set a reasonable minimum and maximum cell size
    return Math.max(8, Math.min(optimalSize, 25));
  }, [dimensions]);

  // Update cell size when container or dimensions change
  useEffect(() => {
    const updateCellSize = () => {
      const newCellSize = calculateCellSize();
      setCellSize(newCellSize);
    };

    updateCellSize();
    
    const resizeObserver = new ResizeObserver(updateCellSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [calculateCellSize]);

  // Keep all your existing game logic
  const createEmptyGrid = useCallback(() => {
    return Array(dimensions.rows).fill().map(() => Array(dimensions.cols).fill(0));
  }, [dimensions]);

  const countNeighbors = useCallback((grid, x, y) => {
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

  const nextGeneration = useCallback(() => {
    setGrid(prevGrid => {
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

  // Canvas rendering function
  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || grid.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    const width = dimensions.cols * cellSize;
    const height = dimensions.rows * cellSize;
    
    // Clear canvas with dark background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    
    // Draw cells
    for (let i = 0; i < dimensions.rows; i++) {
      for (let j = 0; j < dimensions.cols; j++) {
        const x = j * cellSize;
        const y = i * cellSize;
        
        if (grid[i] && grid[i][j] === 1) {
          // Alive cell - solid green
          ctx.fillStyle = '#00ff00';
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        } else {
          // Dead cell - dark green
          ctx.fillStyle = '#001100';
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        }
        
        // Grid lines
        ctx.strokeStyle = '#002200';
        ctx.strokeRect(x, y, cellSize, cellSize);
      }
    }
  }, [grid, dimensions, cellSize]);

  // Handle canvas clicks
  const handleCanvasClick = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    
    if (row >= 0 && row < dimensions.rows && col >= 0 && col < dimensions.cols) {
      setGrid(prevGrid => {
        if (!prevGrid || !prevGrid[row]) return prevGrid;
        
        const newGrid = prevGrid.map((r, i) => 
          i === row ? r.map((c, j) => j === col ? (c ? 0 : 1) : c) : [...r]
        );
        return newGrid;
      });
    }
  }, [dimensions, cellSize]);

  // Draw grid whenever it changes
  useEffect(() => {
    drawGrid();
  }, [drawGrid]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || grid.length === 0) return;
    
    const interval = setInterval(() => {
      nextGeneration();
    }, speed);
    
    return () => clearInterval(interval);
  }, [isPlaying, speed, nextGeneration, grid.length]);

  // Initialize grid and canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = dimensions.cols * cellSize;
    canvas.height = dimensions.rows * cellSize;
    
    if (dimensions.rows > 0 && dimensions.cols > 0) {
      const newGrid = createEmptyGrid();
      for (let i = 0; i < dimensions.rows; i++) {
        for (let j = 0; j < dimensions.cols; j++) {
          newGrid[i][j] = Math.random() > 0.7 ? 1 : 0;
        }
      }
      setGrid(newGrid);
      setGeneration(0);
    }
  }, [dimensions, createEmptyGrid, cellSize]);

  return (
    <div 
      ref={containerRef}
      className={styles.container}
    >
      {/* Header */}
      <div className={styles.header}>
        <span>Conway's Life</span>
        <span>Gen: {generation}</span>
      </div>

      {/* Canvas Grid */}
      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className={styles.canvas}
        />
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.buttonRow}>
          <button 
            onClick={() => {
              setGeneration(0);
              const newGrid = createEmptyGrid();
              for (let i = 0; i < dimensions.rows; i++) {
                for (let j = 0; j < dimensions.cols; j++) {
                  newGrid[i][j] = Math.random() > 0.7 ? 1 : 0;
                }
              }
              setGrid(newGrid);
            }}
            className={styles.button}
          >
            Random
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={styles.button}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
    </div>
  );

};

export default ConwayWidget;