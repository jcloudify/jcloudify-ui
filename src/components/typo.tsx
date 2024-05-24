export const typoSizes = {
  md: {
    primary: "h5",
    secondary: "body2",
  },
  lg: {
    primary: "h4",
    secondary: "body1",
  },
} as const;

export type TypoSizes = keyof typeof typoSizes;
