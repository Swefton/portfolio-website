import { useState, useEffect, useRef, useCallback } from 'react';
import { COLORS } from '@/styles/colors';
import styles from './Conway.module.css';

const ConwayWidget = () => {
  // ALL HOOKS MUST BE DECLARED UNCONDITIONALLY AT THE TOP
  const [grid, setGrid] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(750);
  const [generation, setGeneration] = useState(0);
  const [sizeMode, setSizeMode] = useState('full');
  const canvasRef = useRef();
  const containerRef = useRef();
  
  // Keep grid dimensions fixed to preserve state, only change visual cell size
  const [dimensions] = useState({ rows: 30, cols: 30 });
  const [cellSize, setCellSize] = useState(8);

  // Responsive size detection - ALWAYS runs
  useEffect(() => {
    const updateSizeMode = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      if (width < 150 || height < 120) {
        setSizeMode('hidden');
      } else if (width < 200 || height < 160) {
        setSizeMode('minimal');
      } else if (width < 280 || height < 220) {
        setSizeMode('compact');
      } else {
        setSizeMode('full');
      }
    };

    updateSizeMode();
    
    const resizeObserver = new ResizeObserver(updateSizeMode);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, []);

  // Calculate optimal cell size based on container dimensions (keeping grid size fixed)
  const calculateCellSize = useCallback(() => {
    const container = containerRef.current;
    if (!container) return 8;
    
    const containerRect = container.getBoundingClientRect();
    
    // Reserve space for header and controls based on size mode
    let reservedHeight = 0;
    if (sizeMode === 'full') {
      reservedHeight = 120; // header + controls
    } else if (sizeMode === 'compact') {
      reservedHeight = 80; // minimal header + controls
    } else if (sizeMode === 'minimal') {
      reservedHeight = 40; // just header
    }
    
    const availableWidth = containerRect.width - 40;
    const availableHeight = containerRect.height - reservedHeight;
    
    const maxCellWidth = Math.floor(availableWidth / dimensions.cols);
    const maxCellHeight = Math.floor(availableHeight / dimensions.rows);
    
    const optimalSize = Math.min(maxCellWidth, maxCellHeight);
    return Math.max(3, Math.min(optimalSize, 15)); // Min 3px, max 15px cells
  }, [dimensions, sizeMode]);

  // Update cell size when container or size mode changes
  useEffect(() => {
    const newCellSize = calculateCellSize();
    setCellSize(newCellSize);
  }, [calculateCellSize]);

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
    
    // Clear canvas with HUD background
    ctx.fillStyle = COLORS.BG_PRIMARY;
    ctx.fillRect(0, 0, width, height);
    
    // Draw cells using conservative HUD color scheme
    for (let i = 0; i < dimensions.rows; i++) {
      for (let j = 0; j < dimensions.cols; j++) {
        const x = j * cellSize;
        const y = i * cellSize;
        
        if (grid[i] && grid[i][j] === 1) {
          ctx.fillStyle = COLORS.ACCENT_SOFT_PINK;
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        } else if (cellSize > 4) {
          // Only show grid lines if cells are big enough
          ctx.fillStyle = COLORS.GRID_LINES;
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        }
        
        // Grid lines using neutral gray (only if cells are large enough)
        if (cellSize > 6) {
          ctx.strokeStyle = COLORS.GRID_LINES;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x, y, cellSize, cellSize);
        }
      }
    }
  }, [grid, dimensions, cellSize]);

  // Handle canvas clicks
  const handleCanvasClick = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas || cellSize < 4) return; // Disable clicking for very small cells
    
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
    
    if (dimensions.rows > 0 && dimensions.cols > 0 && grid.length === 0) {
      const newGrid = createEmptyGrid();
      for (let i = 0; i < dimensions.rows; i++) {
        for (let j = 0; j < dimensions.cols; j++) {
          newGrid[i][j] = Math.random() > 0.7 ? 1 : 0;
        }
      }
      setGrid(newGrid);
      setGeneration(0);
    }
  }, [dimensions, createEmptyGrid, cellSize, grid.length]);

  const randomizeGrid = useCallback(() => {
    setGeneration(0);
    const newGrid = createEmptyGrid();
    for (let i = 0; i < dimensions.rows; i++) {
      for (let j = 0; j < dimensions.cols; j++) {
        newGrid[i][j] = Math.random() > 0.7 ? 1 : 0;
      }
    }
    setGrid(newGrid);
  }, [createEmptyGrid, dimensions]);

  // CRITICAL: Always render the same JSX structure, use conditional styling instead
  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${styles[sizeMode]}`}
    >
      {/* Hidden message - conditionally visible via CSS, not conditionally rendered */}
      <div 
        className={styles.hiddenMessage}
        style={{ display: sizeMode === 'hidden' ? 'flex' : 'none' }}
      >
        Conway's Game hidden - container too small
      </div>

      {/* Main content - hidden when size mode is 'hidden' */}
      <div style={{ display: sizeMode === 'hidden' ? 'none' : 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header - simplified for small containers */}
        <div 
          className={sizeMode === 'minimal' ? styles.minimalHeader : styles.header}
          style={{ display: sizeMode === 'minimal' ? 'block' : 'flex' }}
        >
          {sizeMode === 'minimal' ? (
            `Conway's Life - Gen: ${generation}`
          ) : (
            <>
              <span>Conway's Life</span>
              <span>Gen: {generation}</span>
            </>
          )}
        </div>

        {/* Canvas Grid */}
        <div className={styles.canvasContainer}>
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className={styles.canvas}
            style={{ cursor: cellSize >= 4 ? 'pointer' : 'default' }}
          />
        </div>

        {/* Controls - adaptive based on size */}
        <div className={styles.controls}>
          <div className={styles.buttonRow}>
            <button onClick={randomizeGrid} className={styles.button}>
              {sizeMode === 'full' ? 'Random' : 'New'}
            </button>
            
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={styles.button}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            {/* Clear button - hidden via CSS instead of conditional rendering */}
            <button 
              onClick={() => {
                setGrid(createEmptyGrid());
                setGeneration(0);
                setIsPlaying(false);
              }}
              className={styles.button}
              style={{ display: sizeMode === 'full' ? 'block' : 'none' }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConwayWidget;