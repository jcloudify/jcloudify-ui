import React from "react";
import ReactDOM from "react-dom/client";
import {Admin} from "react-admin";

export const App = () => <Admin></Admin>;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
