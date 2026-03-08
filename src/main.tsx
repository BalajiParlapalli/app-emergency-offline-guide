import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";

const isChunkLoadError = (value: unknown) => {
  const message = typeof value === "string"
    ? value
    : value instanceof Error
      ? value.message
      : "";

  return /chunk|dynamically imported module|module script failed|failed to fetch/i.test(message);
};

const recoverFromStaleCache = async () => {
  try {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }

    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } finally {
    window.location.reload();
  }
};

if ("serviceWorker" in navigator) {
  registerSW({
    immediate: true,
    onRegisteredSW: (_, registration) => registration?.update(),
    onRegisterError: (error) => console.error("PWA registration failed", error),
  });
}

let attemptedRecovery = false;
const handleRuntimeFailure = (error: unknown) => {
  if (attemptedRecovery || !isChunkLoadError(error)) {
    return;
  }

  attemptedRecovery = true;
  void recoverFromStaleCache();
};

window.addEventListener("error", (event) => {
  handleRuntimeFailure(event.error ?? event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  handleRuntimeFailure(event.reason);
});

createRoot(document.getElementById("root")!).render(<App />);

