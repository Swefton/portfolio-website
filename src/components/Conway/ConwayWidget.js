import { useState, useEffect, useRef, useCallback } from 'react';
import { COLORS } from '@/styles/colors';
import styles from './Conway.module.css';

const ConwayWidget = () => {
  const [grid, setGrid] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(750);
  const [generation, setGeneration] = useState(0);
  const [sizeMode, setSizeMode] = useState('full');
  const [cellSize, setCellSize] = useState(8);
  const [dimensions] = useState({ rows: 30, cols: 30 });

  const canvasRef = useRef();
  const containerRef = useRef();

  // Unified resize observer: updates both sizeMode and cellSize
  useEffect(() => {
    const updateLayout = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();

      // Determine sizeMode
      let newMode = 'full';
      if (width < 150 || height < 120) {
        newMode = 'hidden';
      } else if (width < 200 || height < 160) {
        newMode = 'minimal';
      } else if (width < 280 || height < 220) {
        newMode = 'compact';
      }
      setSizeMode(newMode);

      // Reserve space depending on mode
      let reservedHeight = 0;
      if (newMode === 'full') reservedHeight = 120;
      else if (newMode === 'compact') reservedHeight = 80;
      else if (newMode === 'minimal') reservedHeight = 40;

      const availableWidth = width - 40;
      const availableHeight = height - reservedHeight;
      const maxCellWidth = Math.floor(availableWidth / dimensions.cols);
      const maxCellHeight = Math.floor(availableHeight / dimensions.rows);
      const optimalSize = Math.min(maxCellWidth, maxCellHeight);
      const newCellSize = Math.max(3, Math.min(optimalSize, 15));

      setCellSize(newCellSize);
    };

    updateLayout(); // run once immediately

    const resizeObserver = new ResizeObserver(updateLayout);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [dimensions]);

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

  const drawGrid = useCallback(() => {
    if (sizeMode === 'hidden') return;
    const canvas = canvasRef.current;
    if (!canvas || grid.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    const width = dimensions.cols * cellSize;
    const height = dimensions.rows * cellSize;
    
    ctx.fillStyle = COLORS.BG_PRIMARY;
    ctx.fillRect(0, 0, width, height);
    
    for (let i = 0; i < dimensions.rows; i++) {
      for (let j = 0; j < dimensions.cols; j++) {
        const x = j * cellSize;
        const y = i * cellSize;
        
        if (grid[i] && grid[i][j] === 1) {
          ctx.fillStyle = COLORS.ACCENT_SOFT_PINK;
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        } else if (cellSize > 4) {
          ctx.fillStyle = COLORS.GRID_LINES;
          ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        }
        if (cellSize > 6) {
          ctx.strokeStyle = COLORS.GRID_LINES;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x, y, cellSize, cellSize);
        }
      }
    }
  }, [grid, dimensions, cellSize, sizeMode]);

  // Keep canvas size in sync & redraw after resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = dimensions.cols * cellSize;
    canvas.height = dimensions.rows * cellSize;
    drawGrid();
  }, [cellSize, dimensions, drawGrid]);

  const handleCanvasClick = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas || cellSize < 4) return;
    
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

  // Draw grid when content changes
  useEffect(() => {
    drawGrid();
  }, [drawGrid]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || grid.length === 0) return;
    const interval = setInterval(nextGeneration, speed);
    return () => clearInterval(interval);
  }, [isPlaying, speed, nextGeneration, grid.length]);

  // Initial grid setup
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

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${styles[sizeMode]}`}
    >
      <div 
        className={styles.hiddenMessage}
        style={{ display: sizeMode === 'hidden' ? 'flex' : 'none' }}
      >
        Conway's Game hidden - container too small
      </div>

      <div style={{ display: sizeMode === 'hidden' ? 'none' : 'flex', flexDirection: 'column', height: '100%' }}>
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

        <div className={styles.canvasContainer}>
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className={styles.canvas}
            style={{ cursor: cellSize >= 4 ? 'pointer' : 'default' }}
          />
        </div>

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
