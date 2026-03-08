import { useRef, useCallback, useState } from "react";

/**
 * Hook to control the device camera torch (flashlight).
 * Falls back to a white-screen overlay if torch is unavailable.
 */
export function useTorch() {
  const [torchOn, setTorchOn] = useState(false);
  const [usingScreen, setUsingScreen] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const trackRef = useRef<MediaStreamTrack | null>(null);

  const enableTorch = useCallback(async () => {
    // Try real torch first
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      const track = stream.getVideoTracks()[0];
      // Check torch capability
      const capabilities = track.getCapabilities?.() as any;
      if (capabilities?.torch) {
        await track.applyConstraints({ advanced: [{ torch: true } as any] });
        streamRef.current = stream;
        trackRef.current = track;
        setUsingScreen(false);
        setTorchOn(true);
        return;
      }
      // No torch capability — stop stream and fall back
      track.stop();
    } catch {
      // Camera not available — fall back
    }
    // Fallback: white screen
    setUsingScreen(true);
    setTorchOn(true);
  }, []);

  const disableTorch = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.applyConstraints({ advanced: [{ torch: false } as any] }).catch(() => {});
      trackRef.current.stop();
      trackRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setTorchOn(false);
    setUsingScreen(false);
  }, []);

  const toggleTorch = useCallback(() => {
    if (torchOn) {
      disableTorch();
    } else {
      enableTorch();
    }
  }, [torchOn, enableTorch, disableTorch]);

  return { torchOn, usingScreen, toggleTorch, enableTorch, disableTorch };
}
