import { createTheme, } from "@mui/material";


const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '575px !important',
          padding: '0px !important',
        }
      },
    }
  },
  palette: {
    primary: {
      main: '#4939c1',
    }
  }
});

export default theme;
