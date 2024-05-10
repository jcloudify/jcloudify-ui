import React from "react";
import ReactDOM from "react-dom/client";
import {Admin, CustomRoutes, Resource} from "react-admin";
import {Navigate, Route} from "react-router-dom";
import {Layout} from "@/layout";
import {authProvider, dataProvider} from "@/providers";
import {defaultTheme} from "@/themes";
import {apps} from "@/operations";
import {AppShowLayout} from "@/operations/apps";

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    theme={defaultTheme}
    layout={Layout}
  >
    <Resource {...apps} />

    <CustomRoutes>
      <Route path="/applications/:appId/show" element={<AppShowLayout />}>
        <Route index element={<Navigate to="overview" />} />
        <Route path="overview" element={<h1>Overview</h1>} />
        <Route path="deployments" element={<h1>Deployments</h1>} />
        <Route path="analytics" element={<h1>Analytics</h1>} />
        <Route path="logs" element={<h1>Logs</h1>} />
      </Route>
    </CustomRoutes>
  </Admin>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
