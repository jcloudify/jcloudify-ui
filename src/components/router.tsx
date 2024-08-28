import React from "react";
import {Route} from "react-router-dom";

export type RouteMap = {
  [k: string]: JSX.Element | RouteMap;
};

/* utility */
export const renderRouteMap = (rm: RouteMap) => {
  const keys = Object.keys(rm);

  return keys.map((key) => {
    if (key == "$$layout") return null;
    const v = rm[key];

    if (isElement(v)) {
      const index = key === "$$index";
      return (
        <Route
          key={key}
          index={index}
          path={index ? undefined : key}
          element={v}
        />
      );
    }

    return (
      <Route
        key={key}
        path={key}
        element={v["$$layout" as keyof typeof v] as React.ReactNode}
      >
        {renderRouteMap(v as RouteMap)}
      </Route>
    );
  });
};

const isElement = (val: any): val is React.ReactElement => "$$typeof" in val;
