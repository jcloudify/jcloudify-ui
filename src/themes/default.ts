import {RaThemeOptions, defaultTheme as RAdefaultTheme} from "react-admin";
import {colors} from "@/themes/colors";

export const defaultTheme: RaThemeOptions = {
  ...RAdefaultTheme,
  palette: {
    ...RAdefaultTheme.palette,
    error: {
      main: "#dc2626",
    },
    primary: {
      main: colors("spring-boot"),
    },
  },
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
          "& .RaLayout-content": {
            marginTop: "2rem",
          },
        },
      },
    },
    RaSidebar: {
      styleOverrides: {
        root: {
          paddingInline: "4px",
        },
      },
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          "height": 40,
          "marginLeft": 3,
          "borderRadius": "6px",
          "&.RaMenuItemLink-active": {
            backgroundColor: "#121212",
            color: "#fff",
          },
          "&.RaMenuItemLink-active .RaMenuItemLink-icon": {
            color: "#fff",
          },
          "& .RaMenuItemLink-icon": {
            margin: 0,
            padding: 0,
            minWidth: 0,
            marginRight: 20,
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "none",
        },
        elevation2: {
          boxShadow: "1px 1px 8px rgba(0, 0, 0, 0.06) !important",
        },
        elevation3: {
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1) !important",
        },
        root: {
          border: "1px solid #ebebeb",
          backgroundClip: "padding-box",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "padding": "10px 0",
          "transition": "background-color .3s ease",
          "&:hover": {
            backgroundColor: `${colors("gray")} !important`,
          },
          "@global": {
            "td:nth-child(4)": {
              color: "#fff !important",
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colors("gray-0")}`,
          padding: "10px !important",
        },
        head: {
          borderBottom: `1px solid ${colors("gray-1")}`,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: 1.2,
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
