import React from "react";
import ReactDOM from "react-dom/client";
import {Admin, Resource} from "react-admin";
import {Layout} from "@/layout";
import {defaultTheme} from "@/themes";

export const App = () => (
  <Admin layout={Layout} theme={defaultTheme}>
    <Resource name="applications" list={React.Fragment} />
  </Admin>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
