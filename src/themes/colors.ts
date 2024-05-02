export const POJA_COLORS = {
  "dark-0": "#09090b",
  "light": "#fff",
  "gray-0": "#f3f4f6",
  "gray-1": "#d1d5db",
};

export const colors = (key: keyof typeof POJA_COLORS) => POJA_COLORS[key];
