import {RaThemeOptions, defaultTheme as RAdefaultTheme} from "react-admin";
import {colors} from "@/themes/colors";

export const defaultTheme: RaThemeOptions = {
  ...RAdefaultTheme,
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    ...RAdefaultTheme.components,
    RaLayout: {
      styleOverrides: {
        root: {
          "& .MuiDrawer-root": {
            height: "calc(100vh - 4em)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        positionFixed: {
          backgroundColor: "#fff !important",
          boxShadow: "none",
          color: "#000 !important",
          borderBottom: `1px solid ${colors("gray-0")}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          backgroundColor: colors("gray-0"),
          borderRight: `1px solid ${colors("gray-0")}`,
        },
      },
    },
  },
};
