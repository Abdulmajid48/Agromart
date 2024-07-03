// React
import React from "react";
import ReactDOM from "react-dom/client";
// CSS
import "./components/index.css";
// React-router
import { BrowserRouter } from "react-router-dom";
// App components
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
