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
 * Controls device camera torch when supported (Android Chrome).
 * Falls back to white-screen light if torch is unavailable.
 * Exposes torchError for debugging on mobile.
 */
export function useTorch(): TorchState {
  const [torchOn, setTorchOn] = useState(false);
  const [usingScreen, setUsingScreen] = useState(false);
  const [supportsTorch, setSupportsTorch] = useState(false);
  const [torchError, setTorchError] = useState<string | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const trackRef = useRef<MediaStreamTrack | null>(null);

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

  const ensureTrack = useCallback(async (): Promise<MediaStreamTrack | null> => {
    // Reuse existing track if alive
    if (trackRef.current && trackRef.current.readyState === "live") {
      return trackRef.current;
    }

    // Clean up dead track
    stopCamera();

    if (!navigator.mediaDevices?.getUserMedia) {
      setTorchError("Camera API not available on this browser.");
      return null;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      });
      const track = stream.getVideoTracks()[0] ?? null;
      if (!track) {
        stream.getTracks().forEach((t) => t.stop());
        setTorchError("No video track found from camera.");
        return null;
      }

      streamRef.current = stream;
      trackRef.current = track;

      // Wait a moment for capabilities to populate on some devices
      await new Promise((r) => setTimeout(r, 200));

      const capabilities = track.getCapabilities?.() as any;
      const hasTorch = Boolean(capabilities?.torch);
      setSupportsTorch(hasTorch);

      if (!hasTorch) {
        setTorchError(
          `Camera opened but torch not supported. Capabilities: ${JSON.stringify(Object.keys(capabilities || {}))}`
        );
      } else {
        setTorchError(null);
      }

      return track;
    } catch (err: any) {
      const msg = err?.name || err?.message || String(err);
      if (msg.includes("NotAllowed") || msg.includes("Permission")) {
        setTorchError("Camera permission denied. Please allow camera access and try again.");
      } else if (msg.includes("NotFound") || msg.includes("DevicesNotFound")) {
        setTorchError("No camera found on this device.");
      } else if (msg.includes("Overconstrained")) {
        setTorchError("Camera constraints not satisfiable (no rear camera?).");
      } else {
        setTorchError(`Camera error: ${msg}`);
      }
      return null;
    }
  }, [stopCamera]);

  const setTorch = useCallback(
    async (on: boolean) => {
      const track = await ensureTrack();
      if (!track) {
        // Fallback to screen
        setUsingScreen(on);
        setTorchOn(on);
        return;
      }

      const capabilities = track.getCapabilities?.() as any;
      if (!capabilities?.torch) {
        setSupportsTorch(false);
        setUsingScreen(on);
        setTorchOn(on);
        return;
      }

      try {
        await track.applyConstraints({ advanced: [{ torch: on } as any] });
        setSupportsTorch(true);
        setUsingScreen(false);
        setTorchOn(on);
        setTorchError(null);
      } catch (err: any) {
        setTorchError(`applyConstraints failed: ${err?.message || err}`);
        setSupportsTorch(false);
        setUsingScreen(on);
        setTorchOn(on);
      }
    },
    [ensureTrack]
  );

  const enableTorch = useCallback(async () => {
    await setTorch(true);
  }, [setTorch]);

  const disableTorch = useCallback(async () => {
    await setTorch(false);
  }, [setTorch]);

  const toggleTorch = useCallback(async () => {
    if (torchOn) {
      await disableTorch();
      stopCamera();
      setUsingScreen(false);
    } else {
      await enableTorch();
    }
  }, [torchOn, enableTorch, disableTorch, stopCamera]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    torchOn,
    usingScreen,
    supportsTorch,
    torchError,
    toggleTorch,
    enableTorch,
    disableTorch,
    releaseTorch: stopCamera,
  };
}
