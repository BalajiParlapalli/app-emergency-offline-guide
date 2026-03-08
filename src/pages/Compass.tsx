import { useState, useEffect } from "react";
import BackLink from "@/components/BackLink";

const Compass = () => {
  const [heading, setHeading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // webkitCompassHeading for iOS, alpha for Android
      const h = (e as any).webkitCompassHeading ?? (e.alpha != null ? (360 - e.alpha) % 360 : null);
      if (h != null) setHeading(Math.round(h));
    };

    if ("DeviceOrientationEvent" in window) {
      // iOS 13+ requires permission
      const DOE = DeviceOrientationEvent as any;
      if (typeof DOE.requestPermission === "function") {
        DOE.requestPermission().then((r: string) => {
          if (r === "granted") window.addEventListener("deviceorientation", handleOrientation, true);
          else setError("Permission denied. Allow motion access in Settings.");
        }).catch(() => setError("Could not request orientation permission."));
      } else {
        window.addEventListener("deviceorientation", handleOrientation, true);
      }
    } else {
      setError("Compass not supported on this device.");
    }

    return () => window.removeEventListener("deviceorientation", handleOrientation, true);
  }, []);

  const getDirection = (deg: number) => {
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(deg / 45) % 8];
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto flex flex-col items-center pb-24" role="main" aria-label="Digital Compass">
      <div className="self-start w-full"><BackLink /></div>
      <h1 className="text-3xl font-bold text-primary mb-6">🧭 Compass</h1>

      {error ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{error}</p>
          <p className="text-sm text-muted-foreground/60">
            Use the manual compass methods in the Navigation guide instead.
          </p>
        </div>
      ) : heading === null ? (
        <div className="text-center py-12">
          <div className="animate-pulse text-6xl mb-4">🧭</div>
          <p className="text-muted-foreground">Waiting for compass data...</p>
          <p className="text-xs text-muted-foreground/60 mt-2">Hold your phone flat and move it in a figure-8 to calibrate</p>
        </div>
      ) : (
        <>
          <div className="relative w-64 h-64 mb-6">
            {/* Compass ring */}
            <div
              className="w-full h-full rounded-full border-4 border-primary/30 flex items-center justify-center transition-transform duration-300"
              style={{ transform: `rotate(${-heading}deg)` }}
            >
              {/* N marker */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-destructive font-bold text-xl">N</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-muted-foreground font-semibold">S</div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">E</div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">W</div>
              {/* Needle */}
              <div className="w-1 h-24 bg-gradient-to-t from-muted-foreground to-destructive rounded-full absolute top-8" />
            </div>
            {/* Fixed pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-primary text-2xl">▼</div>
          </div>

          <div className="text-center">
            <p className="text-5xl font-bold mono text-primary">{heading}°</p>
            <p className="text-2xl font-semibold text-foreground mt-1">{getDirection(heading)}</p>
          </div>

          <div className="mt-8 border border-border rounded-lg p-4 w-full">
            <h3 className="font-semibold mb-2">Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Hold phone flat for best accuracy</li>
              <li>• Move away from metal objects & magnets</li>
              <li>• Calibrate by moving phone in figure-8</li>
              <li>• Magnetic north ≠ true north (declination varies by location)</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Compass;
