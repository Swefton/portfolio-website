// HUD-inspired color system based on style guide
// Primary color tokens for consistent theming

export const COLORS = {
  // Base colors from style guide
  BG_PRIMARY: '#0E0F10',        // --hud-bg: Deep black base
  BG_SECONDARY: '#1A1C1F',      // --hud-surface: Widget backgrounds
  ACCENT_PINK: '#F36CA6',       // --hud-pink: Primary accent
  ACCENT_SOFT_PINK: '#FFB8D2',  // --hud-soft-pink: Secondary accent
  TEXT_PRIMARY: '#FFFFFF',      // --hud-white: High contrast text
  TEXT_SECONDARY: '#AAAAAA',    // --hud-gray: Labels, secondary text
  GRID_LINES: 'rgba(255,255,255,0.08)', // --hud-grid: Structural overlays
  OVERLAY: 'rgba(14,15,16,0.85)', // --hud-overlay: Modal backgrounds

  // Derived colors for specific use cases
  BORDER_PRIMARY: '#F36CA6',    // Same as accent pink
  BORDER_SECONDARY: '#FFB8D2',  // Soft pink for subtle borders
  
  // Interactive states
  HOVER_GLOW: '#FFB8D2',       // Soft pink for hover effects
  FOCUS_GLOW: '#F36CA6',       // Primary pink for focus
  
  // Component-specific colors
  BUTTON_BG: 'transparent',
  BUTTON_BORDER: '#F36CA6',
  BUTTON_TEXT: '#FFFFFF',
  BUTTON_HOVER_BG: 'rgba(255,184,210,0.1)',
  
  // Terminal colors
  TERMINAL_BG: '#0E0F10',
  TERMINAL_TEXT: '#FFFFFF',
  TERMINAL_PROMPT: '#FFB8D2',
  TERMINAL_INPUT: '#FFFFFF',
  
  // Chess widget specific colors
  CHESS_BG: '#0E0F10',                    // Same as BG_PRIMARY
  CHESS_SURFACE: '#1A1C1F',               // Same as BG_SECONDARY  
  CHESS_LIGHT_SQUARE: 'rgba(255,255,255,0.05)', // Very subtle light squares
  CHESS_DARK_SQUARE: '#1A1C1F',           // Same as surface
  CHESS_BORDER: '#FFFFFF',                // White borders for contrast
  CHESS_TEXT_PRIMARY: '#FFFFFF',          // White text
  CHESS_TEXT_SECONDARY: '#AAAAAA',        // Gray text
  CHESS_ACCENT: '#F36CA6',                // Pink accent for active moves
  CHESS_ACCENT_SOFT: '#FFB8D2',           // Soft pink for glows
  CHESS_HOVER: 'rgba(255,255,255,0.1)',  // Hover effects
  CHESS_ACTIVE_BG: 'rgba(255,20,147,0.2)', // Active move background
  
  // Conway's Game of Life
  CONWAY_ALIVE: '#F36CA6',     // Pink for alive cells
  CONWAY_DEAD: 'rgba(255,255,255,0.08)', // Grid lines color for dead cells
  CONWAY_GRID_BG: '#1A1C1F',   // Surface color
  
  // Matrix rain
  MATRIX_CHARS: '#FFB8D2',     // Soft pink characters
  MATRIX_TRAIL: 'rgba(14,15,16,0.7)', // Semi-transparent for trail
  
  // Globe widget
  GLOBE_LINES: '#FFB8D2',      // Soft pink for globe lines
  GLOBE_MARKERS: '#F36CA6',    // Primary pink for markers
  GLOBE_LABELS: '#FFFFFF',     // White for text labels
  GLOBE_LABEL_BG: 'rgba(243,108,166,0.8)', // Pink background for labels
  
  // Modal colors
  MODAL_OVERLAY: 'rgba(14,15,16,0.85)',
  MODAL_BG: '#1A1C1F',
  MODAL_BORDER: '#F36CA6',
  MODAL_HEADER: '#F36CA6',
  MODAL_TEXT: '#FFFFFF',
  MODAL_SIDEBAR_BG: '#0E0F10',
  MODAL_SIDEBAR_HOVER: 'rgba(255,184,210,0.1)',
  
  // Keyboard widget
  KEY_BG: 'transparent',
  KEY_BORDER: '#F36CA6',
  KEY_TEXT: '#FFFFFF',
  KEY_ACTIVE: 'rgba(255,184,210,0.2)',
  KEY_PRESSED: '#FFB8D2',

  // Utility function for dynamic RGB values
  getRGB: (r, g, b) => `rgb(${r}, ${g}, ${b})`
};

// CSS Custom Properties mapping for use in CSS files
export const CSS_VARS = {
  // Base HUD colors
  '--hud-bg': COLORS.BG_PRIMARY,
  '--hud-surface': COLORS.BG_SECONDARY,
  '--hud-pink': COLORS.ACCENT_PINK,
  '--hud-soft-pink': COLORS.ACCENT_SOFT_PINK,
  '--hud-white': COLORS.TEXT_PRIMARY,
  '--hud-gray': COLORS.TEXT_SECONDARY,
  '--hud-grid': COLORS.GRID_LINES,
  '--hud-overlay': COLORS.OVERLAY,

  // Chess widget variables
  '--chess-bg': COLORS.CHESS_BG,
  '--chess-surface': COLORS.CHESS_SURFACE,
  '--chess-light-square': COLORS.CHESS_LIGHT_SQUARE,
  '--chess-dark-square': COLORS.CHESS_DARK_SQUARE,
  '--chess-border': COLORS.CHESS_BORDER,
  '--chess-text-primary': COLORS.CHESS_TEXT_PRIMARY,
  '--chess-text-secondary': COLORS.CHESS_TEXT_SECONDARY,
  '--chess-accent': COLORS.CHESS_ACCENT,
  '--chess-accent-soft': COLORS.CHESS_ACCENT_SOFT,
  '--chess-hover': COLORS.CHESS_HOVER,
  '--chess-active-bg': COLORS.CHESS_ACTIVE_BG,

  // Legacy mappings (keeping for backward compatibility during transition)
  '--color-bg-primary': COLORS.BG_PRIMARY,
  '--color-bg-secondary': COLORS.BG_SECONDARY,
  '--color-bg-tertiary': COLORS.BG_SECONDARY,    // Same as secondary for consistency
  '--color-bg-quaternary': COLORS.BG_PRIMARY,    // Darker variant
  
  '--color-text-primary': COLORS.TEXT_PRIMARY,
  '--color-text-secondary': COLORS.TEXT_SECONDARY,
  '--color-text-tertiary': COLORS.TEXT_PRIMARY,  // Same as primary
  '--color-text-muted': COLORS.TEXT_SECONDARY,
  '--color-text-muted-secondary': COLORS.TEXT_SECONDARY,
  '--color-text-disabled': COLORS.TEXT_SECONDARY,
  '--color-text-on-accent': COLORS.TEXT_PRIMARY,
  
  '--color-border-primary': COLORS.BORDER_PRIMARY,
  '--color-border-secondary': COLORS.BORDER_SECONDARY,
  '--color-border-tertiary': COLORS.GRID_LINES,
  '--color-border-canvas': COLORS.BORDER_PRIMARY,
  
  '--color-accent-grey': COLORS.BG_SECONDARY,    // Using surface color
  '--color-accent-aqua': COLORS.ACCENT_PINK,     // Mapping aqua to pink
  '--color-accent-red': COLORS.ACCENT_PINK,      // Using pink for markers
  
  '--color-overlay': COLORS.OVERLAY,
  '--color-shadow': COLORS.ACCENT_SOFT_PINK,
  
  // Button colors
  '--color-bg-button': COLORS.BUTTON_BG,
  '--color-bg-button-secondary': COLORS.BUTTON_BG,
  '--color-bg-button-disabled': COLORS.BG_SECONDARY,
  
  // Chess specific
  '--color-bg-light-square': COLORS.CHESS_LIGHT_SQUARE,
  '--color-bg-dark-square': COLORS.CHESS_DARK_SQUARE,
  
  // Matrix specific
  '--color-matrix-trail': COLORS.MATRIX_TRAIL,
  
  // Globe specific
  '--color-canvas-clear': 'rgba(0,0,0,0)',
  
  // Labels
  '--color-label-bg': COLORS.GLOBE_LABEL_BG,
  
  // Legacy green colors (mapping to pink theme)
  '--color-lime-green-bright': COLORS.ACCENT_PINK,
  '--color-white': COLORS.TEXT_PRIMARY
};