import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProviderContainer } from "morabaa-provider";

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
    <ProviderContainer />
  </BrowserRouter>
);
