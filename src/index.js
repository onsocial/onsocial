import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Register the service worker
    navigator.serviceWorker
      .register('/service-worker.js')  // Path to your service worker file
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
