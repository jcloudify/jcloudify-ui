export const ms = (val: any) => {
  return `${val.toLocaleString()}ms`;
};

export const prettyJSON = (rawObj: object) => {
  return JSON.stringify(rawObj, null, 2);
};
