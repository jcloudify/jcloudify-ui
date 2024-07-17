export const toHookformObj = <T extends Record<string, any>>(
  o: T
): T & {__id: T["id"]} => {
  return {...o, __id: o.id};
};

export const fromHookformObj = <T extends object>(o: object): T => {
  const {__id, ...newo} = o as any;
  if (__id) return {...newo, id: __id};
  return newo as T;
};
