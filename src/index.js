import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Install Prompt Logic
let deferredPrompt;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Register the service worker
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });

  // Listen for the beforeinstallprompt event
  window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent the default behavior (which is the automatic prompt)
    event.preventDefault();

    // Save the event so it can be triggered later
    deferredPrompt = event;

    // Create a custom install button
    const installButton = document.createElement("button");
    installButton.innerText = "Install OnSocial";
    document.body.appendChild(installButton);

    // Style the button (customize it as you like)
    installButton.style.position = 'fixed';
installButton.style.bottom = '5px'; 
installButton.style.left = '50%'; 
installButton.style.transform = 'translateX(-50%)'; 
installButton.style.padding = '10px 20px';
installButton.style.backgroundColor = '#232528';
installButton.style.color = 'white';
installButton.style.border = 'none';
installButton.style.borderRadius = '50px';
installButton.style.fontFamily = "'Open Sans', sans-serif";
installButton.style.fontWeight = '500';

// Hover effect
installButton.addEventListener('mouseover', function() {
    installButton.style.backgroundColor = 'black';
});

installButton.addEventListener('mouseout', function() {
    installButton.style.backgroundColor = '#232528';
});

    // When the button is clicked, show the install prompt
    installButton.addEventListener("click", () => {
      // Show the install prompt when the user clicks the button
      deferredPrompt.prompt();

      // Wait for the user's response to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        // Remove the button after the prompt interaction
        installButton.style.display = "none";
        deferredPrompt = null;
      });
    });
  });
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
