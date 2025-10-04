import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // <--- Endereço corrigido!
import App from "./App.jsx"; // <--- Endereço corrigido!


const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
