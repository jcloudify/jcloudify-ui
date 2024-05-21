import React from "react";
import ReactDOM from "react-dom/client";
import {Admin, CustomRoutes, Resource} from "react-admin";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "@/layout";
import {authProvider, dataProvider} from "@/providers";
import {AuthCallback, LoginWithGithub} from "@/security";
import {apps} from "@/operations";
import {
  AppCreateLayout,
  AppShowLayout,
  appShowViews,
  appCreateViews,
} from "@/operations/apps";
import {defaultTheme} from "@/themes";

const JCAdmin = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    theme={defaultTheme}
    layout={Layout}
    loginPage={LoginWithGithub}
  >
    <Resource {...apps} />

    <CustomRoutes>
      <Route path="/applications/:appId/show" element={<AppShowLayout />}>
        <Route index element={<Navigate to="environments" />} />
        {Object.keys(appShowViews).map((path) => (
          <Route key={path} path={path} element={appShowViews[path]} />
        ))}
      </Route>

      <Route path="/applications/create" element={<AppCreateLayout />}>
        <Route index element={<Navigate to="from-scratch" />} />
        {Object.keys(appCreateViews).map((path) => (
          <Route key={path} path={path} element={appCreateViews[path]} />
        ))}
      </Route>
    </CustomRoutes>
  </Admin>
);

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="*" element={<JCAdmin />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
