import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Get root element with fallback
const rootElement = document.getElementById("root");

// Error check
if (!rootElement) {
  console.error("❌ Root element not found. Check your HTML file.");
  document.body.innerHTML = '<h1>Error: Root element not found</h1>';
} else {
  try {
    console.log("✅ Starting React app...");
    createRoot(rootElement).render(<App />);
    console.log("✅ React app rendered successfully");
  } catch (error) {
    console.error("❌ Failed to render React app:", error);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: monospace;">
        <h2>Failed to start application</h2>
        <p>${String(error)}</p>
      </div>
    `;
  }
}