import { useRef, useCallback, useState, useEffect } from "react";

type TorchState = {
  torchOn: boolean;
  usingScreen: boolean;
  supportsTorch: boolean;
  torchError: string | null;
  toggleTorch: () => Promise<void>;
  enableTorch: () => Promise<void>;
  disableTorch: () => Promise<void>;
  releaseTorch: () => void;
};

/**
 * Dynamically import @capgo/capacitor-flash.
 * Returns null when running in a plain browser (no Capacitor native shell).
 */
async function getFlashPlugin() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod = await import("@capgo/capacitor-flash");
    const Flash = mod.Flash ?? mod.default;
    if (!Flash?.isAvailable) return null;
    const { value: available } = await Flash.isAvailable();
    return available ? Flash : null;
  } catch {
    return null;
  }
}

export function useTorch(): TorchState {
  const [torchOn, setTorchOn] = useState(false);
  const [usingScreen, setUsingScreen] = useState(false);
  const [supportsTorch, setSupportsTorch] = useState(false);
  const [torchError, setTorchError] = useState<string | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const trackRef = useRef<MediaStreamTrack | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flashPluginRef = useRef<any | null | undefined>(undefined); // undefined = not checked yet

  const stopCamera = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.stop();
      trackRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  // ---------- Native Capacitor path ----------

  const enableTorchNative = useCallback(async () => {
    const Flash = flashPluginRef.current;
    if (!Flash) return false;
    try {
      await Flash.switchOn({ intensity: 1 });
      setSupportsTorch(true);
      setTorchError(null);
      setUsingScreen(false);
      setTorchOn(true);
      return true;
    } catch (err: any) {
      console.warn("[torch-native] switchOn failed", err);
      return false;
    }
  }, []);

  const disableTorchNative = useCallback(async () => {
    const Flash = flashPluginRef.current;
    if (!Flash) return false;
    try {
      await Flash.switchOff();
      setTorchOn(false);
      setUsingScreen(false);
      return true;
    } catch {
      return false;
    }
  }, []);

  // ---------- WebRTC browser path ----------

  const enableTorchBrowser = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setTorchError("Camera API not available in this browser.");
      setUsingScreen(true);
      setTorchOn(true);
      return;
    }

    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      });
      const track = stream.getVideoTracks()[0] ?? null;

      if (!track) {
        stream.getTracks().forEach((t) => t.stop());
        throw new Error("No video track found");
      }

      streamRef.current = stream;
      trackRef.current = track;

      await new Promise((r) => setTimeout(r, 200));

      const caps = (track.getCapabilities?.() ?? {}) as MediaTrackCapabilities & { torch?: boolean };

      if (caps.torch) {
        await track.applyConstraints({ advanced: [{ torch: true } as MediaTrackConstraintSet] });
        setSupportsTorch(true);
        setTorchError(null);
        setUsingScreen(false);
        setTorchOn(true);
        return;
      }

      stopCamera();
      setSupportsTorch(false);
      setTorchError(
        "Hardware torch not available in this browser. Install the native app for real flashlight control, or tap to use screen light."
      );
    } catch (err: any) {
      const msg = err?.name || err?.message || String(err);
      if (msg.includes("NotAllowed") || msg.includes("Permission")) {
        setTorchError("Camera permission denied. Allow camera access and retry.");
      } else {
        setTorchError(`Camera/torch error: ${msg}`);
      }
      setSupportsTorch(false);
    }

    // Fallback: screen light
    setUsingScreen(true);
    setTorchOn(true);
  }, [stopCamera]);

  const disableTorchBrowser = useCallback(async () => {
    if (trackRef.current) {
      try {
        await trackRef.current.applyConstraints({ advanced: [{ torch: false } as MediaTrackConstraintSet] });
      } catch {
        // no-op
      }
    }
    setTorchOn(false);
    setUsingScreen(false);
  }, []);

  // ---------- Unified API ----------

  const enableTorch = useCallback(async () => {
    // Lazy-init native plugin check
    if (flashPluginRef.current === undefined) {
      flashPluginRef.current = await getFlashPlugin();
    }
    // Try native first
    if (flashPluginRef.current) {
      const ok = await enableTorchNative();
      if (ok) return;
    }
    // Fall back to browser
    await enableTorchBrowser();
  }, [enableTorchNative, enableTorchBrowser]);

  const disableTorch = useCallback(async () => {
    if (flashPluginRef.current) {
      const ok = await disableTorchNative();
      if (ok) return;
    }
    await disableTorchBrowser();
  }, [disableTorchNative, disableTorchBrowser]);

  const toggleTorch = useCallback(async () => {
    if (torchOn) {
      await disableTorch();
      stopCamera();
    } else {
      await enableTorch();
    }
  }, [torchOn, enableTorch, disableTorch, stopCamera]);

  const releaseTorch = useCallback(() => {
    stopCamera();
    setTorchOn(false);
    setUsingScreen(false);
  }, [stopCamera]);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  return {
    torchOn,
    usingScreen,
    supportsTorch,
    torchError,
    toggleTorch,
    enableTorch,
    disableTorch,
    releaseTorch,
  };
}
