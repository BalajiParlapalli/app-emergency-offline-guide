import { useState, useEffect } from "react";

interface BatteryStatus {
  level: number;
  charging: boolean;
  supported: boolean;
}

export function useBattery() {
  const [battery, setBattery] = useState<BatteryStatus>({ level: 1, charging: false, supported: false });

  useEffect(() => {
    let batt: any = null;

    const update = (b: any) => {
      setBattery({ level: b.level, charging: b.charging, supported: true });
    };

    if ("getBattery" in navigator) {
      (navigator as any).getBattery().then((b: any) => {
        batt = b;
        update(b);
        b.addEventListener("levelchange", () => update(b));
        b.addEventListener("chargingchange", () => update(b));
      }).catch(() => {});
    }

    return () => {
      if (batt) {
        batt.removeEventListener("levelchange", () => {});
        batt.removeEventListener("chargingchange", () => {});
      }
    };
  }, []);

  const isLowBattery = battery.supported && !battery.charging && battery.level <= 0.2;

  return { ...battery, isLowBattery };
}
