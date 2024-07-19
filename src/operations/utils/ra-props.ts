export const makeSelectChoices = (
  strings: string[],
  valueKey: string = "name"
) =>
  strings.map((str) => ({
    id: str,
    [valueKey]: str,
  }));
