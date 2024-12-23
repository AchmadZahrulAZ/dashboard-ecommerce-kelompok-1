import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// index.js atau App.js
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "./index.css"; // Import Tailwind CSS
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
