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

  const enableTorch = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setTorchError("Camera API not available.");
      setUsingScreen(true);
      setTorchOn(true);
      return;
    }

    // Strategy 1: Request torch directly in getUserMedia (works on most Android Chrome)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          // @ts-ignore — torch is a valid constraint on Android Chrome
          torch: true,
        } as any,
      });
      const track = stream.getVideoTracks()[0];
      if (track) {
        streamRef.current = stream;
        trackRef.current = track;
        setSupportsTorch(true);
        setUsingScreen(false);
        setTorchOn(true);
        setTorchError(null);
        return;
      }
      stream.getTracks().forEach((t) => t.stop());
    } catch {
      // Strategy 1 failed, try strategy 2
    }

    // Strategy 2: Open camera first, then apply torch via advanced constraints
    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      });
      const track = stream.getVideoTracks()[0];
      if (track) {
        streamRef.current = stream;
        trackRef.current = track;

        // Small delay for capabilities to populate
        await new Promise((r) => setTimeout(r, 300));

        // Try applyConstraints with torch
        try {
          await track.applyConstraints({ advanced: [{ torch: true } as any] });
          setSupportsTorch(true);
          setUsingScreen(false);
          setTorchOn(true);
          setTorchError(null);
          return;
        } catch {
          // applyConstraints failed
        }

        // Strategy 3: Try ImageCapture API
        if ("ImageCapture" in window) {
          try {
            const imageCapture = new (window as any).ImageCapture(track);
            const photoCapabilities = await imageCapture.getPhotoCapabilities?.();
            if (photoCapabilities?.fillLightMode?.includes("flash")) {
              // Device supports flash through ImageCapture
              await track.applyConstraints({
                advanced: [{ torch: true } as any],
              });
              setSupportsTorch(true);
              setUsingScreen(false);
              setTorchOn(true);
              setTorchError(null);
              return;
            }
          } catch {
            // ImageCapture approach failed
          }
        }

        // All strategies failed — get capabilities for debug
        const caps = track.getCapabilities?.() as any;
        const capKeys = Object.keys(caps || {}).join(", ");
        stopCamera();
        setTorchError(
          `Torch not available via any method. Device capabilities: [${capKeys}]. Try Chrome browser (not in-app browser).`
        );
      }
    } catch (err: any) {
      const msg = err?.name || err?.message || String(err);
      if (msg.includes("NotAllowed") || msg.includes("Permission")) {
        setTorchError("Camera permission denied. Allow camera access and retry.");
      } else {
        setTorchError(`Camera error: ${msg}`);
      }
    }

    // Fallback: white screen
    setUsingScreen(true);
    setTorchOn(true);
    setSupportsTorch(false);
  }, [stopCamera]);

  const disableTorch = useCallback(async () => {
    if (trackRef.current) {
      try {
        await trackRef.current.applyConstraints({ advanced: [{ torch: false } as any] });
      } catch {
        // ignore
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
    return () => { stopCamera(); };
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
