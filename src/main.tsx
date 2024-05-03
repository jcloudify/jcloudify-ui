import React from "react";
import ReactDOM from "react-dom/client";
import {Admin, Resource} from "react-admin";
import {Layout} from "@/layout";
import {dataProvider} from "@/providers";
import {defaultTheme} from "@/themes";
import {applications} from "@/operations";

export const App = () => (
  <Admin dataProvider={dataProvider} theme={defaultTheme} layout={Layout}>
    <Resource {...applications} />
  </Admin>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
