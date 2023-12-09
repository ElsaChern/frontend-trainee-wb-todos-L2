import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/serviceWorker.js`)
    .then((registration) => {
      console.log("Service worker registration succeeded:", registration);
    });
} else {
  console.error("Service workers are not supported.");
}
