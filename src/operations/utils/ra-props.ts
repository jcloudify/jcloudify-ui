export const makeSelectChoices = (strings: string[]) =>
  strings.map((str) => ({
    id: str,
    name: str,
  }));
