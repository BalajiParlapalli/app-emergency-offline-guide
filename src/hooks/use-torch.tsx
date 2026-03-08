import { useRef, useCallback, useState, useEffect } from "react";

type TorchState = {
  torchOn: boolean;
  usingScreen: boolean;
  supportsTorch: boolean;
  toggleTorch: () => Promise<void>;
  enableTorch: () => Promise<void>;
  disableTorch: () => Promise<void>;
  releaseTorch: () => void;
};

/**
 * Controls device torch when supported (typically Android Chrome).
 * Falls back to white-screen light if torch is unavailable.
 */
export function useTorch(): TorchState {
  const [torchOn, setTorchOn] = useState(false);
  const [usingScreen, setUsingScreen] = useState(false);
  const [supportsTorch, setSupportsTorch] = useState(false);

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
    if (trackRef.current) return trackRef.current;
    if (!("mediaDevices" in navigator) || !navigator.mediaDevices.getUserMedia) {
      return null;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      });
      const track = stream.getVideoTracks()[0] ?? null;
      if (!track) {
        stream.getTracks().forEach((t) => t.stop());
        return null;
      }

      streamRef.current = stream;
      trackRef.current = track;

      const capabilities = track.getCapabilities?.() as MediaTrackCapabilities & { torch?: boolean };
      const hasTorch = Boolean(capabilities?.torch);
      setSupportsTorch(hasTorch);
      return track;
    } catch {
      return null;
    }
  }, []);

  const setTorch = useCallback(async (on: boolean) => {
    const track = await ensureTrack();
    if (!track) {
      setUsingScreen(on);
      setTorchOn(on);
      return;
    }

    const capabilities = track.getCapabilities?.() as MediaTrackCapabilities & { torch?: boolean };
    if (!capabilities?.torch) {
      setSupportsTorch(false);
      setUsingScreen(on);
      setTorchOn(on);
      return;
    }

    try {
      await track.applyConstraints({ advanced: [{ torch: on } as MediaTrackConstraintSet] });
      setSupportsTorch(true);
      setUsingScreen(false);
      setTorchOn(on);
    } catch {
      setSupportsTorch(false);
      setUsingScreen(on);
      setTorchOn(on);
    }
  }, [ensureTrack]);

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

  return { torchOn, usingScreen, supportsTorch, toggleTorch, enableTorch, disableTorch, releaseTorch: stopCamera };
}
