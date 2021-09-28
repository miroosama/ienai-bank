import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderColor: 'white',
          color: 'white',
          width: '50%',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '50%',
          '& label': {
            color: 'white',
            borderBottomColor: 'white',
          },
          '& label.Mui-focused': {
            color: 'white',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
          },
        }
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    }
  },
});
