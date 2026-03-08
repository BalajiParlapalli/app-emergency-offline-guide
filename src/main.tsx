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
  const updateSW = registerSW({
    immediate: true,
    onRegisteredSW: (_, registration) => registration?.update(),
    onRegisterError: (error) => console.error("PWA registration failed", error),
    onNeedRefresh() {
      showUpdateToast(updateSW);
    },
  });
}

function showUpdateToast(updateSW: (reloadPage?: boolean) => Promise<void>) {
  const container = document.createElement("div");
  container.setAttribute("role", "alert");
  container.setAttribute("aria-live", "assertive");
  Object.assign(container.style, {
    position: "fixed",
    bottom: "80px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "9999",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 20px",
    borderRadius: "12px",
    background: "hsl(24 95% 46%)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
    animation: "slideUp 0.3s ease-out",
    maxWidth: "90vw",
  });

  container.innerHTML = `
    <span>🔄 New version available</span>
    <button id="pwa-update-btn" style="
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.4);
      color: #fff;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
    ">Update now</button>
    <button id="pwa-dismiss-btn" aria-label="Dismiss" style="
      background: none;
      border: none;
      color: rgba(255,255,255,0.7);
      font-size: 18px;
      cursor: pointer;
      padding: 2px 6px;
      line-height: 1;
    ">✕</button>
  `;

  if (!document.getElementById("pwa-toast-style")) {
    const style = document.createElement("style");
    style.id = "pwa-toast-style";
    style.textContent = `@keyframes slideUp { from { opacity:0; transform: translateX(-50%) translateY(20px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }`;
    document.head.appendChild(style);
  }

  document.body.appendChild(container);

  container.querySelector("#pwa-update-btn")!.addEventListener("click", () => {
    container.querySelector("#pwa-update-btn")!.textContent = "Updating…";
    updateSW(true);
  });

  container.querySelector("#pwa-dismiss-btn")!.addEventListener("click", () => {
    container.remove();
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

