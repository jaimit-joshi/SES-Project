import { createTheme } from "@mui/material/styles"

// Light theme configuration
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7f56da",
      light: "#9d7de3",
      dark: "#6441c2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#4361ee",
      light: "#6b81f0",
      dark: "#2f4acb",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2d3748",
      secondary: "#718096",
    },
    error: {
      main: "#f56565",
    },
    warning: {
      main: "#ed8936",
    },
    info: {
      main: "#4299e1",
    },
    success: {
      main: "#48bb78",
    },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        },
      },
    },
  },
})

// Dark theme configuration
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9d7de3",
      light: "#b89eea",
      dark: "#7f56da",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6b81f0",
      light: "#8a9df3",
      dark: "#4361ee",
      contrastText: "#ffffff",
    },
    background: {
      default: "#1a202c",
      paper: "#2d3748",
    },
    text: {
      primary: "#f7fafc",
      secondary: "#cbd5e0",
    },
    error: {
      main: "#fc8181",
    },
    warning: {
      main: "#f6ad55",
    },
    info: {
      main: "#63b3ed",
    },
    success: {
      main: "#68d391",
    },
    divider: "#4a5568",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
        },
      },
    },
  },
})
