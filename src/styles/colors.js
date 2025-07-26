// colors.js - Centralized color constants for the entire application
// These colors align with the CSS custom properties in globals.css

export const COLORS = {
  // Primary colors
  BLACK: '#000000',
  WHITE: '#ffffff',
  
  // Terminal/Matrix theme colors
  LIME_GREEN: '#00ff00',
  LIME_GREEN_BRIGHT: 'limegreen',
  
  // Background colors
  BG_PRIMARY: '#000000',
  BG_SECONDARY: '#0a0a0a', 
  BG_TERTIARY: '#111111',
  BG_QUATERNARY: '#1a1a1a',
  BG_BUTTON: '#001100',
  BG_BUTTON_SECONDARY: '#333333',
  BG_BUTTON_DISABLED: '#222222',
  BG_LIGHT_SQUARE: '#2a2a2a',
  BG_DARK_SQUARE: '#1a1a1a',
  
  // Border colors
  BORDER_PRIMARY: '#333333',
  BORDER_SECONDARY: '#555555', 
  BORDER_TERTIARY: '#222222',
  BORDER_CANVAS: '#002200',
  
  // Text colors
  TEXT_PRIMARY: '#00ff00',
  TEXT_SECONDARY: '#d4d4d4',
  TEXT_TERTIARY: '#eeeeee',
  TEXT_MUTED: '#666666',
  TEXT_MUTED_SECONDARY: '#888888',
  TEXT_DISABLED: '#666666',
  TEXT_ON_ACCENT: '#000000',
  
  // Accent colors
  ACCENT_AQUA: 'aqua',
  ACCENT_GREY: 'grey',
  ACCENT_RED: 'red',
  
  // Overlay colors
  OVERLAY: 'rgba(0, 0, 0, 0.7)',
  SHADOW: 'rgba(0, 0, 0, 0.6)',
  
  // Component-specific colors
  MATRIX_TRAIL: 'rgba(0, 0, 0, 0.1)',
  CANVAS_CLEAR: 0x000000,
  LABEL_BG: 'rgba(255, 255, 255, 0.9)',
  
  // Dynamic color functions
  getRGB: (r, g, b) => `rgb(${r}, ${g}, ${b})`,
  getRGBA: (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`,
  getHex: (color) => color,
};

// CSS Custom Property mappings (for reference)
export const CSS_VARS = {
  '--color-black': COLORS.BLACK,
  '--color-white': COLORS.WHITE,
  '--color-lime-green': COLORS.LIME_GREEN,
  '--color-lime-green-bright': COLORS.LIME_GREEN_BRIGHT,
  '--color-bg-primary': COLORS.BG_PRIMARY,
  '--color-bg-secondary': COLORS.BG_SECONDARY,
  '--color-bg-tertiary': COLORS.BG_TERTIARY,
  '--color-bg-quaternary': COLORS.BG_QUATERNARY,
  '--color-bg-button': COLORS.BG_BUTTON,
  '--color-bg-button-secondary': COLORS.BG_BUTTON_SECONDARY,
  '--color-bg-button-disabled': COLORS.BG_BUTTON_DISABLED,
  '--color-bg-light-square': COLORS.BG_LIGHT_SQUARE,
  '--color-bg-dark-square': COLORS.BG_DARK_SQUARE,
  '--color-border-primary': COLORS.BORDER_PRIMARY,
  '--color-border-secondary': COLORS.BORDER_SECONDARY,
  '--color-border-tertiary': COLORS.BORDER_TERTIARY,
  '--color-border-canvas': COLORS.BORDER_CANVAS,
  '--color-text-primary': COLORS.TEXT_PRIMARY,
  '--color-text-secondary': COLORS.TEXT_SECONDARY,
  '--color-text-tertiary': COLORS.TEXT_TERTIARY,
  '--color-text-muted': COLORS.TEXT_MUTED,
  '--color-text-muted-secondary': COLORS.TEXT_MUTED_SECONDARY,
  '--color-text-disabled': COLORS.TEXT_DISABLED,
  '--color-text-on-accent': COLORS.TEXT_ON_ACCENT,
  '--color-accent-aqua': COLORS.ACCENT_AQUA,
  '--color-accent-grey': COLORS.ACCENT_GREY,
  '--color-overlay': COLORS.OVERLAY,
  '--color-shadow': COLORS.SHADOW,
};

export default COLORS;