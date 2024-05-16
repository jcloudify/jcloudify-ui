import React from "react";

// source: usehooks.com
export function useSet<T>(values: Iterable<T> = []) {
  const setRef = React.useRef(new Set(values));
  const [, reRender] = React.useReducer((x) => x + 1, 0);

  setRef.current.add = (...args) => {
    const res = Set.prototype.add.apply(setRef.current, args);
    reRender();

    return res;
  };

  setRef.current.clear = (...args) => {
    Set.prototype.clear.apply(setRef.current, args);
    reRender();
  };

  setRef.current.delete = (...args) => {
    const res = Set.prototype.delete.apply(setRef.current, args);
    reRender();

    return res;
  };

  return setRef.current;
}
