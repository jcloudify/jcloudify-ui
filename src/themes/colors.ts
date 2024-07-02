import {green, red, amber} from "@mui/material/colors";

export const POJA_COLORS = {
  "dark-0": "#09090b",
  "light": "#fff",
  "gray": "#f9fafb",
  "gray-0": "#f3f4f6",
  "gray-1": "#ebebeb",
  "gray-2": "#d1d5db",

  "spring-boot": "#43a047",

  "success": green[700],
  "error": red[700],
  "warning": amber[700],
};

export const colors = (key: keyof typeof POJA_COLORS) => POJA_COLORS[key];
