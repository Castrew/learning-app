import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: { fontFamily: "cursive" },
  palette: {
    primary: {
      main: "#1976D2",
      light: "#4791DB",
      dark: "#115293",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#6554C0",
      light: "#FADADD",
      dark: "#463A86",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#36B37E",
      light: "#5EC297",
      dark: "#257D58",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#00B8D9",
      light: "#33C6E0",
      dark: "#008097",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFAB00",
      light: "#FFBB33",
      dark: "#B27700",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#FF5630",
      light: "#FF7759",
      dark: "#B23C21",
      contrastText: "#FFFFFF",
    },
  },
});
