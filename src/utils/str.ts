export const stripPrefix = (str: string, prefix: string) => {
  if (str.startsWith(prefix)) {
    return str.slice(prefix.length);
  }
  return str;
};

export const humanizeSnakeStr = (s: string) => {
  return s.replace(/_/g, " ");
};

export const capitalize = (s: string) => {
  return s
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
};
