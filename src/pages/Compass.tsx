import { useState, useEffect, useCallback } from "react";
import BackLink from "@/components/BackLink";

const Compass = () => {
  const [heading, setHeading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [manualDeg, setManualDeg] = useState<string>("");
  const [permissionNeeded, setPermissionNeeded] = useState(false);

  const startListening = useCallback(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const h = (e as any).webkitCompassHeading ?? (e.alpha != null ? (360 - e.alpha) % 360 : null);
      if (h != null) setHeading(Math.round(h));
    };

    window.addEventListener("deviceorientation", handleOrientation, true);
    return () => window.removeEventListener("deviceorientation", handleOrientation, true);
  }, []);

  const requestPermission = useCallback(async () => {
    const DOE = DeviceOrientationEvent as any;
    if (typeof DOE.requestPermission === "function") {
      try {
        const r = await DOE.requestPermission();
        if (r === "granted") {
          setPermissionNeeded(false);
          startListening();
        } else {
          setError("Permission denied. Allow motion access in Settings.");
        }
      } catch {
        setError("Could not request orientation permission.");
      }
    }
  }, [startListening]);

  useEffect(() => {
    if (!("DeviceOrientationEvent" in window)) {
      setError("Compass sensor not available on this device. Use the manual compass below.");
      return;
    }

    const DOE = DeviceOrientationEvent as any;
    if (typeof DOE.requestPermission === "function") {
      // iOS 13+ needs user gesture to request
      setPermissionNeeded(true);
    } else {
      // Android / desktop — just listen
      const handleOrientation = (e: DeviceOrientationEvent) => {
        const h = (e as any).webkitCompassHeading ?? (e.alpha != null ? (360 - e.alpha) % 360 : null);
        if (h != null) setHeading(Math.round(h));
      };
      window.addEventListener("deviceorientation", handleOrientation, true);

      // If no data after 3 seconds, show fallback
      const timeout = setTimeout(() => {
        setError("Compass sensor not responding. Your device may not have a magnetometer. Use the manual compass below.");
      }, 3000);

      const onData = (e: DeviceOrientationEvent) => {
        if (e.alpha != null) clearTimeout(timeout);
      };
      window.addEventListener("deviceorientation", onData, { once: true });

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation, true);
        clearTimeout(timeout);
      };
    }
  }, []);

  const getDirection = (deg: number) => {
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(deg / 45) % 8];
  };

  const manualHeading = manualDeg ? parseInt(manualDeg, 10) : null;

  return (
    <main className="min-h-screen px-4 py-8 max-w-lg mx-auto flex flex-col items-center pb-24" aria-label="Digital Compass">
      <div className="self-start w-full"><BackLink /></div>
      <h1 className="text-3xl font-bold text-primary mb-6">🧭 Compass</h1>

      {permissionNeeded && !error && heading === null && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">iOS requires permission to access compass data.</p>
          <button
            onClick={requestPermission}
            className="touch-target bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-lg"
            aria-label="Allow compass access"
          >
            🧭 Allow Compass Access
          </button>
        </div>
      )}

      {!permissionNeeded && !error && heading === null && (
        <div className="text-center py-12">
          <div className="animate-pulse text-6xl mb-4" aria-hidden="true">🧭</div>
          <p className="text-muted-foreground">Waiting for compass data...</p>
          <p className="text-xs text-muted-foreground/60 mt-2">Hold your phone flat and move it in a figure-8 to calibrate</p>
        </div>
      )}

      {heading !== null && (
        <>
          <div className="relative w-64 h-64 mb-6">
            <div
              className="w-full h-full rounded-full border-4 border-primary/30 flex items-center justify-center transition-transform duration-300"
              style={{ transform: `rotate(${-heading}deg)` }}
              aria-hidden="true"
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-destructive font-bold text-xl">N</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-muted-foreground font-semibold">S</div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">E</div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">W</div>
              <div className="w-1 h-24 bg-gradient-to-t from-muted-foreground to-destructive rounded-full absolute top-8" />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-primary text-2xl" aria-hidden="true">▼</div>
          </div>

          <div className="text-center" aria-live="off" role="status" aria-label={`Heading: ${heading} degrees, direction: ${getDirection(heading)}`}>
            <p className="text-5xl font-bold mono text-primary">{heading}°</p>
            <p className="text-2xl font-semibold text-foreground mt-1">{getDirection(heading)}</p>
          </div>
        </>
      )}

      {/* Manual compass fallback */}
      {(error || heading === null) && (
        <div className="w-full mt-6 border border-border rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-2">📐 Manual Compass</h2>
          {error && <p className="text-sm text-muted-foreground mb-3">{error}</p>}
          <label htmlFor="manual-deg" className="text-sm text-muted-foreground block mb-2">
            Enter bearing in degrees (0–360):
          </label>
          <input
            id="manual-deg"
            type="number"
            min="0"
            max="360"
            value={manualDeg}
            onChange={(e) => setManualDeg(e.target.value)}
            placeholder="e.g. 45"
            className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary mb-3"
            aria-label="Enter compass bearing in degrees"
          />
          {manualHeading !== null && !isNaN(manualHeading) && manualHeading >= 0 && manualHeading <= 360 && (
            <div className="text-center p-4 border border-primary/30 rounded-lg">
              <p className="text-3xl font-bold mono text-primary">{manualHeading}°</p>
              <p className="text-xl font-semibold text-foreground mt-1">{getDirection(manualHeading)}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 border border-border rounded-lg p-4 w-full">
        <h2 className="font-semibold mb-2">📋 Tips</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Hold phone flat for best accuracy</li>
          <li>• Move away from metal objects & magnets</li>
          <li>• Calibrate by moving phone in figure-8</li>
          <li>• Magnetic north ≠ true north (declination varies by location)</li>
          <li>• Without compass: sun rises in East, sets in West. At noon, shadow points North in India.</li>
        </ul>
      </div>
    </div>
  );
};

export default Compass;
