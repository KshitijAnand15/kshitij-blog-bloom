// ✅ Dynamically import the buffer shim and attach it
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ✅ Polyfill Buffer only if it's missing
import("buffer").then(({ Buffer }) => {
  if (!window.Buffer) {
    window.Buffer = Buffer;
  }

  createRoot(document.getElementById("root")!).render(<App />);
});
