export const makeSelectChoices = (
  strings: (string | number)[],
  valueKey: string = "name"
) =>
  strings.map((str) => ({
    id: str,
    [valueKey]: str,
  }));
