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

  const getDebugInfo = useCallback(() => {
    const supported = (navigator.mediaDevices?.getSupportedConstraints?.() ?? {}) as MediaTrackSupportedConstraints & {
      torch?: boolean;
    };
    return {
      userAgent: navigator.userAgent,
      secureContext: window.isSecureContext,
      torchConstraintSupported: Boolean(supported.torch),
    };
  }, []);

  const enableTorch = useCallback(async () => {
    const debug = getDebugInfo();
    console.info("[torch] enable attempt", debug);

    if (!navigator.mediaDevices?.getUserMedia) {
      setTorchError("Camera API not available in this browser.");
      setUsingScreen(true);
      setTorchOn(true);
      return;
    }

    // Strategy 1: Open environment camera and then enable torch via applyConstraints.
    // (Most reliable for Android Chrome)
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

      // Let capabilities settle on some devices
      await new Promise((r) => setTimeout(r, 200));

      const caps = (track.getCapabilities?.() ?? {}) as MediaTrackCapabilities & { torch?: boolean };
      const settings = (track.getSettings?.() ?? {}) as MediaTrackSettings & { torch?: boolean };
      console.info("[torch] caps/settings", { caps, settings });

      if (caps.torch) {
        await track.applyConstraints({ advanced: [{ torch: true } as MediaTrackConstraintSet] });
        const nextSettings = (track.getSettings?.() ?? {}) as MediaTrackSettings & { torch?: boolean };
        console.info("[torch] enabled", { nextSettings });

        setSupportsTorch(true);
        setTorchError(null);
        setUsingScreen(false);
        setTorchOn(true);
        return;
      }

      // Torch key missing = browser/device does not expose torch in WebRTC
      stopCamera();
      setSupportsTorch(false);
      setTorchError(
        `Browser/device does not expose camera torch (caps.torch missing). UA: ${navigator.userAgent}`
      );
    } catch (err: any) {
      const msg = err?.name || err?.message || String(err);
      console.warn("[torch] enable failed", msg);
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
  }, [getDebugInfo, stopCamera]);

  const disableTorch = useCallback(async () => {
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
