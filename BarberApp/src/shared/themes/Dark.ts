import { createTheme } from '@mui/material';
import { cyan, pink } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: pink[700],
      dark: pink[800],
      light: pink[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff',
    },
    background: {
      default: '#010101',
      paper: '#010101'
    }
  },
  typography: {
    allVariants: {
      color: 'white'
    }
  }
});