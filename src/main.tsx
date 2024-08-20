import React from "react";
import ReactDOM from "react-dom/client";
import {Admin, CustomRoutes, Resource} from "react-admin";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ThemeProvider, createTheme} from "@mui/material";
import {Layout} from "@/layout";
import {authProvider, dataProvider} from "@/providers";
import {AuthCallback, AuthRegistration, Authentication} from "@/security";
import {apps, billing} from "@/operations";
import {AppShowLayout, appShowViews, appCreateViews} from "@/operations/apps";
import {AppInstallationCallback} from "@/operations/github";
import {PaymentDetails} from "@/operations/payment-details";
import {defaultTheme} from "@/themes";
import {renderRouteMap} from "@/components/router";

const JCAdmin = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    theme={defaultTheme}
    layout={Layout}
    loginPage={Authentication}
    requireAuth
  >
    <Resource {...apps} />
    <Resource {...billing} />

    <CustomRoutes>
      <Route path="/applications/:appId/show" element={<AppShowLayout />}>
        <Route index element={<Navigate to="environments" />} />
        {renderRouteMap(appShowViews)}
      </Route>

      <Route path="/applications/create">
        {renderRouteMap(appCreateViews)}
      </Route>

      <Route path="/billing/payment-details" element={<PaymentDetails />} />
    </CustomRoutes>
  </Admin>
);

export const App = () => (
  <ThemeProvider theme={{...createTheme(defaultTheme)}}>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/installation/callback"
          element={<AppInstallationCallback />}
        />
        <Route path="/auth/register" element={<AuthRegistration />} />
        <Route path="*" element={<JCAdmin />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
